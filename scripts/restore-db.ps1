# Restore the database from db_backup.sql
# Make sure db_backup.sql exists and containers are running

if (!(Test-Path "db_backup.sql")) {
  Write-Host "Error: db_backup.sql not found. Please run backup-db.ps1 first or provide the backup file."
  exit 1
}

Get-Content db_backup.sql | docker exec -i mysql_db mysql -u root -proot ventas

Write-Host "Database restore completed from db_backup.sql"