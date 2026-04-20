const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { businessSlug, email, password, role = 'customer' } = req.body;

    if (!businessSlug || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Verificar que la tienda existe
    const [businesses] = await pool.query(
      "SELECT id, name FROM businesses WHERE slug = ?",
      [businessSlug]
    );

    if (businesses.length === 0) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    const business = businesses[0];

    // Verificar que no exista ya un usuario con ese email en esta tienda
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ? AND business_id = ?",
      [email, business.id]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Ya existe un usuario con este email en esta tienda" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    await pool.query(
      "INSERT INTO users (business_id, email, password, role) VALUES (?, ?, ?, ?)",
      [business.id, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
      business: {
        name: business.name,
        slug: businessSlug
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

exports.createBusiness = async (req, res) => {
  try {
    const { businessName, email, password, whatsappNumber, phone } = req.body;

    if (!businessName || !email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Crear slug simple
    const slug = businessName.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Verificar que el slug no exista
    const [existingBusiness] = await pool.query(
      "SELECT id FROM businesses WHERE slug = ?",
      [slug]
    );

    if (existingBusiness.length > 0) {
      return res.status(400).json({ message: "Ya existe una tienda con este nombre" });
    }

    // Crear negocio
    const [businessResult] = await pool.query(
      "INSERT INTO businesses (name, slug, whatsapp_number, phone) VALUES (?, ?, ?, ?)",
      [businessName, slug, whatsappNumber || null, phone || null]
    );

    const businessId = businessResult.insertId;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario owner
    await pool.query(
      "INSERT INTO users (business_id, email, password, role) VALUES (?, ?, ?, 'owner')",
      [businessId, email, hashedPassword]
    );

    res.status(201).json({
      message: "Tienda creada correctamente",
      business: {
        id: businessId,
        name: businessName,
        slug: slug
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la tienda" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      "SELECT u.*, b.name as business_name, b.slug as business_slug FROM users u JOIN businesses b ON u.business_id = b.id WHERE u.email = ?",
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
      {
        userId: user.id,
        businessId: user.business_id,
        role: user.role,
        businessName: user.business_name,
        businessSlug: user.business_slug,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        businessName: user.business_name,
        businessSlug: user.business_slug,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login" });
  }
};