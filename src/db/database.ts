import mysql2, {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "@public/constants";

const config: ConnectionOptions = {
  host: DB_HOST,
  user: DB_USER,
  port: Number(DB_PORT),
  password: DB_PASSWORD,
  database: DB_NAME,
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
