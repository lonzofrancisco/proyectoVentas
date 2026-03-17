const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  try {
    const businessId = req.user.businessId;

    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.business_id = ?`,
      [businessId]
    );

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo productos" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { name, description, price, category_id } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Nombre y precio son obligatorios" });
    }

    await pool.query(
      `INSERT INTO products (business_id, category_id, name, description, price)
       VALUES (?, ?, ?, ?, ?)`,
      [businessId, category_id || null, name, description || null, price]
    );

    res.status(201).json({ message: "Producto creado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando producto" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { id } = req.params;
    const { name, description, price, category_id, is_active } = req.body;

    await pool.query(
      `UPDATE products 
       SET name = ?, description = ?, price = ?, category_id = ?, is_active = ?
       WHERE id = ? AND business_id = ?`,
      [name, description, price, category_id, is_active, id, businessId]
    );

    res.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id = ? AND business_id = ?",
      [id, businessId]
    );

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando producto" });
  }
};