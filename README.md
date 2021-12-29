# fullstack-server-pern
PostgreSQL, expressjs, reactjs and node experiment where i try to create fully working login/register system and chat with logging app.  
  
If on Windows don't use WSL2 to run this project, it takes ages to compile, either force use WSL1 or run from powershell:
```
$env:PGPASSWORD='pgSQLpass'; $env:PGDATABASE='database_name'; npm run start:dev
```  
Or if you want to start  in production:
```
$env:PGPASSWORD='pgSQLpass'; $env:PGDATABASE='database_name'; npm run start:prod
```  
If it's your first time running this run this first:
```
npm install
```