import {Pool} from 'pg';
import {config} from '../env/config'

const pool = new Pool({
  database: config.DB_DATABASE,
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: config.DB_PORT || 5432
});

export default pool;