#!/bin/bash

# Restore the database from db_backup.sql
# Make sure db_backup.sql exists and containers are running

if [ ! -f "db_backup.sql" ]; then
  echo "Error: db_backup.sql not found. Please run backup-db.sh first or provide the backup file."
  exit 1
fi

docker exec -i mysql_db mysql -u root -proot ventas < db_backup.sql

echo "Database restore completed from db_backup.sql"