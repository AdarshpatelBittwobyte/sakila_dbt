import pendulum
import dlt
from dlt.sources import incremental
from sqlalchemy import create_engine, text
from sql_database import sql_database

def load_database_table(credential, db_name, db_schema, incremental_by):
    try:
        source = sql_database(credentials=credential, schema=db_schema)
        for table_name in source.resources.keys():
            incremental_source = incremental(incremental_by, initial_value=pendulum.datetime(1999, 1, 1, 0, 0, 0))
            source.resources[table_name].apply_hints(incremental=incremental_source)
            pipeline = dlt.pipeline(
                pipeline_name=db_name, destination="postgres", dataset_name="loaded_data"
            )
            info = pipeline.run(source.with_resources(table_name), table_name=f"{table_name}_{db_name}", write_disposition="merge")
            normalize_info = pipeline.last_trace.last_normalize_info
            print(f"processed for {table_name}")
    except Exception as e:
        print(f"Error loading data for {db_name}: {e}")

if __name__ == "__main__":
    try:
        engine = create_engine("postgresql://postgres:welcome_1234@localhost:5432/sakila_wh")
        with engine.connect() as conn:
            query = text("select db_name, db_schema, credential, incremental_by from prod.sou_cred")
            result = conn.execute(query)
            rows = result.fetchall()
            print(rows)
        for row in rows:
            db_name, db_schema, credential, incremental_by = row
            print(row)
            load_database_table(credential, db_name, db_schema, incremental_by)
    except Exception as e:
        print(f"Error in main script: {e}")