import pg from 'pg';

const Pool = pg.Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: '123456',
  port: 5432,
})

export default pool;