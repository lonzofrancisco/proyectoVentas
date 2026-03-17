const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { businessName, email, password } = req.body;

    if (!businessName || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Crear slug simple
    const slug = businessName.toLowerCase().replace(/\s+/g, "-");

    // Crear negocio
    const [businessResult] = await pool.query(
      "INSERT INTO businesses (name, slug) VALUES (?, ?)",
      [businessName, slug]
    );

    const businessId = businessResult.insertId;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    await pool.query(
      "INSERT INTO users (business_id, email, password) VALUES (?, ?, ?)",
      [businessId, email, hashedPassword]
    );

    res.status(201).json({ message: "Negocio creado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { userId: user.id, businessId: user.business_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login" });
  }
};