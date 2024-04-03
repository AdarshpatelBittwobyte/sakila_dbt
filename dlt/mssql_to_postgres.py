import os
import dlt
from sqlalchemy import create_engine, text
import toml

# Get the absolute path to the directory containing the script
script_dir = os.path.dirname(os.path.abspath(__file__))
toml_path = os.path.join(script_dir, "config.toml")

# Load credentials from TOML file
with open(toml_path, "r") as f:
    credentials = toml.load(f)

# Define tables and schema
tables = {
    "Production": ["Product", "ProductCategory", "ProductSubCategory"],
    "sales": ["currency", "currencyrate", "customer","salesorderdetail","salesorderheader","salesperson","salesterritory","store"],
}

# Create SQLAlchemy engine
engine = create_engine(credentials["sql_server"]["connection_string"])

# Create pipeline
pipeline = dlt.pipeline(
    pipeline_name="from_database",
    destination=dlt.destinations.postgres(credentials={**credentials["postgres"], "schema": credentials["postgres"]["schema"]}),  # Pass PostgreSQL credentials and schema to destination
    dataset_name="test"
)

# Loop through tables and load data
for schema, tables_list in tables.items():
    for table in tables_list:
        query = text(f"SELECT * FROM {schema}.{table}")  # Construct SQL query as a text object
        with engine.connect() as conn:
            result = conn.execute(query)
            rows = result.fetchall()
            
        # Run pipeline for each table
        load_info = pipeline.run(rows, table_name=table, write_disposition="replace")
        print(load_info)

  