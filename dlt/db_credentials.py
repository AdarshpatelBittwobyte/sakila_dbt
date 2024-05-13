from sqlalchemy import create_engine

# Define the credentials
db_credentials = {
    'username': 'postgres',
    'password': 'welcome_1234',
    'host': 'localhost',
    'port': '5432',
    'database': 'sakila_wh'
}
db_credentials2 = {
    'username': 'postgres',
    'password': 'welcome_1234',
    'host': 'localhost',
    'port': '5432',
    'database': 'adventure_db'
}

# Construct the connection string
connection_string = f"postgresql://{db_credentials['username']}:{db_credentials['password']}@{db_credentials['host']}:{db_credentials['port']}/{db_credentials['database']}"
connection_string2 = f"postgresql://{db_credentials2['username']}:{db_credentials2['password']}@{db_credentials2['host']}:{db_credentials2['port']}/{db_credentials2['database']}"

# Create the engine
#engine = create_engine(connection_string)

# Define the file path
log_file_path = 'C:\sakila_dbt\dlt\pipline_trace.log'