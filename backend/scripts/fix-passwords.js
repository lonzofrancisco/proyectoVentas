const mysql = require("mysql2/promise");

(async () => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "root",
    database: "ventas",
  });

  const hash = "$2b$10$68dLXV5zdo/RgStyCH40jOhkv8DNl1D0awnXi3JZbZb8hLDydWvmC";
  await connection.query(
    "UPDATE users SET password = ? WHERE email IN (?, ?, ?, ?)",
    [
      hash,
      "owner@tienda.com",
      "admin@tienda.com",
      "owner@comidas.com",
      "owner@perfumeria.com",
    ]
  );

  const [rows] = await connection.query(
    "SELECT email, password FROM users WHERE email IN (?, ?, ?, ?)",
    [
      "owner@tienda.com",
      "admin@tienda.com",
      "owner@comidas.com",
      "owner@perfumeria.com",
    ]
  );

  console.log(rows);
  await connection.end();
})();