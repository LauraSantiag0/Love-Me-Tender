#!/bin/bash

if [ -f ../.env ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

for var in DB_NAME DB_USER DB_PASS DB_HOST DB_PORT; do
  if [ -z "${!var}" ]; then
    echo "$var is not set. Please set it in the .env file."
    exit 1
  fi
done

execute_sql() {
    local sql=$1
    if ! PGPASSWORD=$DB_PASS psql -U $DB_USER -h $DB_HOST -p $DB_PORT -c "$sql"; then
        echo "Error executing SQL command: $sql"
        exit 1
    fi
}

execute_sql_file() {
    local file=$1
    if ! PGPASSWORD=$DB_PASS psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f "$file"; then
        echo "Error executing SQL file: $file"
        exit 1
    fi
}

echo "Dropping database if it exists..."
execute_sql "DROP DATABASE IF EXISTS $DB_NAME;"

echo "Creating new database..."
execute_sql "CREATE DATABASE $DB_NAME;"

echo "Running SQL migration files..."
for file in ../database/migrations/sqls/*.sql; do
    echo "Running $file..."
    execute_sql_file "$file"
done

echo "Database setup complete."
