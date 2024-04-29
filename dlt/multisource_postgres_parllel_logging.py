import dlt
from sqlalchemy import create_engine, text, inspect
from sql_database import sql_database
import multiprocessing
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_and_rename_table_names(credential, db_name, db_schema):
    engine = create_engine(f"{credential}")
    inspector = inspect(engine)
    table_names = inspector.get_table_names(schema=db_schema)
    renamed_table_names = [f"{db_name}_{db_schema}_{table}" for table in table_names]
    logger.info(f"Renamed table names: {renamed_table_names}")
    return renamed_table_names
def load_database_table(credential, db_name, db_schema,renamed_table_names):
    #logger.info(f"Loading table {db_schema}.{db_name} started.")
    start_time = time.time()
    pipeline = dlt.pipeline(
        pipeline_name=db_name, destination="postgres", dataset_name="test_load_parallel"
    )
    source = sql_database(credentials=credential, schema=db_schema)
    info = pipeline.run(source, write_disposition="replace")
    end_time = time.time()
   # logger.info(f"Loading table {db_schema}.{db_name} completed in {end_time - start_time:.2f} seconds.")

def process_table_row(row):
    db_name, db_schema, credential = row
    process_start_time = time.time()  # Log start time for the process
    logger.info(f"Process started for table {db_schema}.{db_name} at {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(process_start_time))}.")
    renamed_table_names = fetch_and_rename_table_names(credential, db_name, db_schema)
     
    load_database_table(credential, db_name, db_schema,renamed_table_names )
    process_end_time = time.time()  # Log end time for the process
    logger.info(f"Process completed for table {db_schema}.{db_name} at {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(process_end_time))} in {process_end_time - process_start_time:.2f} seconds.")

if __name__ == "__main__":
    start_time = time.time()  # Log start time
    logger.info(f"Job started at {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))}")

    engine = create_engine("postgresql://postgres:welcome_1234@localhost:5432/adventure_db")
    with engine.connect() as conn:
        query = text("select db_name, db_schema, credential from stg.source_cred")
        result = conn.execute(query)
        rows = result.fetchall()

    # Create a multiprocessing pool
    pool = multiprocessing.Pool(processes=multiprocessing.cpu_count())
    # Iterate over each row and process it
    for row in rows:
        pool.apply(process_table_row, args=(row,))
    # Close the pool to release resources
    pool.close()
    pool.join()

    end_time = time.time()  # Log end time
    logger.info(f"Job completed at {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(end_time))}")
    logger.info(f"Total job duration: {end_time - start_time:.2f} seconds.")