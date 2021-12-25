# fullstack-server-pern
PostgreSQL, expressjs, reactjs and node experiment where i try to create fully working login/register system and chat with logging app.  
  
If on Windows don't use WSL2 to run this project, it takes ages to compile, either force use WSL1 or run from powershell:
```
$env:PGPASSWORD='pgSQLpass'; $env:PGDATABASE='database_name'; npm run build; npm run start
```