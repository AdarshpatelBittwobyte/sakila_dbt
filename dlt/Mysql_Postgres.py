import os
import toml
import dlt
import pandas as pd
from sqlalchemy import create_engine, inspect

# Get the absolute path to the directory containing the script
script_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(script_dir, "Config.toml")

# Load configurations from Config.toml
config = toml.load(config_path)

# Connection configurations
mysql_config = config["mysql"]
postgres_config = config["postgres"]

# Create MySQL engine
mysql_url = f"mysql://{mysql_config['username']}:{mysql_config['password']}@{mysql_config['host']}:{mysql_config['port']}/{mysql_config['database']}"
mysql_engine = create_engine(mysql_url)

# Create PostgreSQL engine
postgres_url = f"postgresql://{postgres_config['username']}:{postgres_config['password']}@{postgres_config['host']}:{postgres_config['port']}/{postgres_config['database']}"
postgres_engine = create_engine(postgres_url)

# Define pipeline
pipeline = dlt.pipeline(
    pipeline_name="from_database",
    destination="postgres",
    dataset_name=postgres_config["schema"]
)

# Get table names from MySQL database
mysql_inspector = inspect(mysql_engine)
mysql_tables = mysql_inspector.get_table_names()

# Get existing tables from PostgreSQL database
postgres_inspector = inspect(postgres_engine)
existing_postgres_tables = postgres_inspector.get_table_names(schema=postgres_config['schema'])

# Iterate over tables and load data
for table in mysql_tables:
    try:
        # Use pandas to read data directly from MySQL
        df = pd.read_sql(f"SELECT * FROM {table}", con=mysql_engine)

        # Check if the table exists in PostgreSQL, if not, create it
        if table not in existing_postgres_tables:
            df.head(0).to_sql(table, con=postgres_engine, schema=postgres_config['schema'], if_exists='replace', index=False)

        # Load data into PostgreSQL
        df.to_sql(table, con=postgres_engine, schema=postgres_config['schema'], if_exists='replace', index=False)

        print(f"Successfully loaded data from {table}")
    except Exception as e:
        print(f"Error loading data from {table}: {e}")
