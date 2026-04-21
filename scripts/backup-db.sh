#!/bin/bash

# Backup the database to db_backup.sql
docker exec mysql_db mysqldump -u root -proot ventas > db_backup.sql

echo "Database backup completed: db_backup.sql"