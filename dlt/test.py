import dlt
from sqlalchemy import create_engine
import toml

# Read credentials from TOML file
credentials = toml.load("C:\sakila_dbt\dlt\config.toml")


tables = {
    "Production": ["Product", "ProductCategory", "ProductSubCategory"],
    "sales": ["currency", "currencyrate", "customer","salesorderdetail","salesorderheader","salesperson","salesterritory","store"],
}

# Create SQLAlchemy engine for SQL Server
sql_server_connection_string = (
    f"mssql+pyodbc:///?odbc_connect=DRIVER={credentials['sql_server']['driver']};"
    f"SERVER={credentials['sql_server']['server']};"
    f"DATABASE={credentials['sql_server']['database']};"
    f"UID={credentials['sql_server']['username']};"
    f"PWD={credentials['sql_server']['password']}"
)
sql_engine = create_engine(sql_server_connection_string)

# Initialize dlt pipeline
pipeline = dlt.pipeline(
    pipeline_name="AdventureWorks2019",
    destination="postgres",
    dataset_name=credentials["postgres"]["database"],
    credentials=credentials["postgres"]
)

for schema, tables_list in tables.items():
    for table in tables_list:
        with sql_engine.connect() as conn:
            query = f"SELECT * FROM {schema}.{table}"
            result = conn.execute(query)
            rows = result.fetchall()
                
        load_info = pipeline.run(rows, table_name=table, write_disposition="replace")
        print(load_info)