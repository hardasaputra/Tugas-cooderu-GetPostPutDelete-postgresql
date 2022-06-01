const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sales",
  password: "postgres",
  port: "5432",
});

module.exports = pool;
