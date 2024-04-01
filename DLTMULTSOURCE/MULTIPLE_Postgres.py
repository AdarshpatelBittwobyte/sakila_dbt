
import os
import toml
import dlt
import pandas as pd
from sqlalchemy import create_engine, inspect

# Get the absolute path to the directory containing the script
script_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(script_dir, "Credentials.toml")

# Load configurations from Config.toml
config = toml.load(config_path)

# Connection configurations
mysql_config = config.get("mysql", {})
postgres_config = config.get("postgres", {})
mssql_config = config.get("mssql", {})

# Define function to create engine based on source type
def create_engine_for_source(source_config):
    if source_config["type"] == "mysql":
        url = f"mysql://{source_config['username']}:{source_config['password']}@{source_config['host']}:{source_config['port']}/{source_config['database']}"
    elif source_config["type"] == "mssql":
        url = f"mssql+pyodbc://{source_config['username']}:{source_config['password']}@{source_config['host']}/{source_config['database']}?driver={source_config['driver']}"
    else:
        raise ValueError(f"Unsupported source type: {source_config['type']}")
    
    return create_engine(url)

# Ask user which source they want to load data from
print("Available sources:")
print("1. MySQL")
print("3. MSSQL")

selected_source_index = int(input("Enter the number corresponding to the source you want to load data from: "))

if selected_source_index == 1:
    selected_source = "mysql"
    selected_config = mysql_config

elif selected_source_index == 2:
    selected_source = "mssql"
    selected_config = mssql_config
else:
    print("Invalid selection.")
    exit()

# Create engine for selected source
source_engine = create_engine_for_source(selected_config)

# Create PostgreSQL engine
postgres_url = f"postgresql://{postgres_config['username']}:{postgres_config['password']}@{postgres_config['host']}:{postgres_config['port']}/{postgres_config['database']}"
postgres_engine = create_engine(postgres_url)

# Define pipeline
pipeline = dlt.pipeline(
    pipeline_name="from_database",
    destination="postgres",
    dataset_name=postgres_config["schema"]
)

# Define function to load data from source to PostgreSQL
def load_data_from_source_to_postgres(table):
    try:
        # Use pandas to read data directly from source
        df = pd.read_sql(f"SELECT * FROM {table}", con=source_engine)

        # Check if the table exists in PostgreSQL, if not, create it
        if table not in existing_postgres_tables:
            df.head(0).to_sql(table, con=postgres_engine, schema=postgres_config['schema'], if_exists='replace', index=False)

        # Load data into PostgreSQL
        df.to_sql(table, con=postgres_engine, schema=postgres_config['schema'], if_exists='replace', index=False)

        print(f"Successfully loaded data from {selected_source} to PostgreSQL table {table}")
    except Exception as e:
        print(f"Error loading data from {selected_source} to PostgreSQL table {table}: {e}")

# Get existing tables from PostgreSQL database
postgres_inspector = inspect(postgres_engine)
existing_postgres_tables = postgres_inspector.get_table_names(schema=postgres_config['schema'])

# Iterate over tables from selected source and load data
source_inspector = inspect(source_engine)
source_tables = source_inspector.get_table_names()
for table in source_tables:
    load_data_from_source_to_postgres(table)