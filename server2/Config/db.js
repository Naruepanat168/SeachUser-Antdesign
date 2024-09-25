const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("MySQL successfully connected");
    return connection; // ส่งคืน connection เพื่อให้สามารถใช้งานที่อื่นได้
  } catch (err) {
    console.log("Error connecting to MySQL database:", err);
    throw err; // ส่งข้อผิดพลาดกลับไปเพื่อให้จัดการได้ที่ server.js
  }
};
module.exports = connectDB;
