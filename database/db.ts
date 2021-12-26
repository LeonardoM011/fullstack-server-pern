import { Pool, QueryResult } from "pg";

// Creating new pool
// Getting variables through environment variables because it's safer than putting it in code
// In powershell use: $env:PGHOST='127.0.0.1';$env:PGPASSWORD='123456';node index.js
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'postgres',
  password: process.env.PGPASSWORD || '',
  port: Number(process.env.PGPORT) || 5432
});

// Use only if it's the first time running the server
export function createTable() : void {
  // Creating SQL query
  const text : string = `CREATE TABLE IF NOT EXISTS accounts (
    userid SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
    );`;
  // Executing SQL query
  pool
    .query(text)
    .then(res => {
      console.log(res);
    })
    .catch(e => console.error(e.stack));
}

export function addUser() : void {
  // Creating SQL query with arguments
  const text : string = 'INSERT INTO accounts(username, password, created_on) VALUES($1, $2, NOW()) RETURNING *';
  // Arguments which are not included in original string and have little risk of SQL injection
  const values : string[] = ['leonardo3', '123456'];
  pool.query(text, values)
    .then(res => {
      console.log(res);
  })
  .catch(e => console.error(e.stack));
}

export async function getUserById(id : number) : Promise<QueryResult<any>> {
  const text : string = 'SELECT * FROM accounts WHERE userid = $1;';
  const values : string[] = [String(id)];

  return pool.query(text, values);
}

/*export default getUserById = async (id : number) => {
  const text : string = 'SELECT * FROM accounts WHERE userid = $1;';
  const values : string[] = [String(id)];

  return pool.query(text, values);
}*/

process.on('exit', function() {
  pool.end();
  console.log("EXIT")
});
