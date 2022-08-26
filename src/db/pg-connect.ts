import {Pool} from 'pg';
import {config} from '../env/config'

const pool = new Pool({
  database: config.DB_DATABASE,
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: 5432 || config.DB_PORT
});

export default pool;