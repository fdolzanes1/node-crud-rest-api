import Pool from 'pg-pool';

const pool = new Pool({
  database: 'ecommerce',
  user: 'postgres',
  password: 'docker',
  host: 'localhost',
  port: 5432
});

export default pool;