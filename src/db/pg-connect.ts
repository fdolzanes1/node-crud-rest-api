import {Pool} from 'pg';

const pool = new Pool({
  database: "postgres",
  user: "postgres",
  password: "docker",
  host: "localhost",
  port: 5432
});

export default pool;