const pool = require("../config/db");

exports.getCategories = async (req, res) => {
  try {
    const businessId = req.user.businessId;

    const [categories] = await pool.query(
      "SELECT * FROM categories WHERE business_id = ?",
      [businessId]
    );

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo categorías" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Nombre requerido" });
    }

    await pool.query(
      "INSERT INTO categories (business_id, name) VALUES (?, ?)",
      [businessId, name]
    );

    res.status(201).json({ message: "Categoría creada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando categoría" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { id } = req.params;
    const { name } = req.body;

    await pool.query(
      "UPDATE categories SET name = ? WHERE id = ? AND business_id = ?",
      [name, id, businessId]
    );

    res.json({ message: "Categoría actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando categoría" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { id } = req.params;

    await pool.query(
      "DELETE FROM categories WHERE id = ? AND business_id = ?",
      [id, businessId]
    );

    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando categoría" });
  }
};