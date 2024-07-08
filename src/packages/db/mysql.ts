import mysql from 'mysql2/promise';

export async function connectDatabase() {
  try {
    const connection = await mysql.createConnection({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}
