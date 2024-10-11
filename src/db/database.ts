import mysql2, {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

import dotenv from "dotenv";

dotenv.config();

const config: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0,
};

const pool = mysql2.createPool(config);

class Database {
  async query<T extends RowDataPacket[] | ResultSetHeader>(
    sql: string,
    values?: any
  ) {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query<T>(sql, values);
      return results;
    } finally {
      connection.release();
    }
  }
}

export default new Database();
