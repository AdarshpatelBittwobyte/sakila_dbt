import dlt
from sqlalchemy import create_engine, text

# Define PostgreSQL credentials
postgres_credentials = {
    "database": "adventure_db",
    "username": "postgres",
    "password": "welcome",
    "host": "localhost"
}

# Define tables and schema
tables = {
    "Production": ["Product", "ProductCategory", "ProductSubCategory"],
    "sales": ["currency", "currencyrate", "customer","salesorderdetail","salesorderheader","salesperson","salesterritory","store"],
}

# Create SQLAlchemy engine
engine = create_engine("mssql+pyodbc:///?odbc_connect="
                                    "DRIVER={ODBC Driver 17 for SQL Server};"
                                    "SERVER=B2B00024;"
                                    "DATABASE=AdventureWorks2019;"
                                    "trusted_connection=yes")

# Create pipeline
pipeline = dlt.pipeline(
    pipeline_name="from_database",
    destination=dlt.destinations.postgres(credentials=postgres_credentials),  # Pass PostgreSQL credentials to destination
    dataset_name="stg"
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
