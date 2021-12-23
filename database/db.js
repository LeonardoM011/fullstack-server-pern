const { Pool } = require("pg");

// TODO: conjoin this with server file

// Getting variables through environment variables because it's safer than putting it in code
// In powershell use: $env:PGHOST='127.0.0.1';$env:PGPASSWORD='123456';node index.js
const PGHOST = process.env.PGHOST || 'localhost';
const PGUSER = process.env.PGUSER || 'postgres';
const PGDATABASE = process.env.PGDATABASE || 'postgres';
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = process.env.PGUSER || 5432;

// Creating new pool
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT
});

// Use only if it's the first time running the server
function createTable() {
  // Creating SQL query
  const text = `CREATE TABLE IF NOT EXISTS accounts (
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

addUser();
function addUser() {
  // Creating SQL query with arguments
  const text = 'INSERT INTO accounts(username, password, created_on) VALUES($1, $2, NOW()) RETURNING *';
  // Arguments which are not included in original string and have little risk of SQL injection
  const values = ['leonardo3', '123456'];
  pool
    .query(text, values)
    .then(res => {
      console.log(res);
  })
  .catch(e => console.error(e.stack));
}

getUser(3);
function getUser(id) {
  const text = 'SELECT * FROM accounts WHERE userid = $1;';
  const values = [id];
  pool
    .query(text, values)
    .then(res => {
      console.log(res.rows[0]);
  })
  .catch(e => console.error(e.stack));
}

cleanUp();
function cleanUp() {
  pool.end();
}