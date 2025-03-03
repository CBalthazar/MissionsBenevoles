import { createPool } from "mariadb";
import "dotenv/config";

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 5,
});

export default pool;
