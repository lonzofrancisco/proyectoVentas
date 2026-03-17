require("dotenv").config();
const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Probar conexión a MySQL
    await pool.query("SELECT 1");
    console.log("✅ Conectado a MySQL");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a MySQL:", error);
  }
}

startServer();