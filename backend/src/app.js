
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const app = express();

const categoriesRoutes = require("./routes/categories.routes");
const productsRoutes = require("./routes/products.routes");
const businessRoutes = require("./routes/business.routes");


const authMiddleware = require("./middlewares/auth.middleware");
const storeRoutes = require("./routes/store.routes");

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (imágenes)
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.get("/", (req, res) => {
    res.json({ message: "API funcionando 🚀" });
});


app.get("/", (req, res) => {
    res.json({ message: "API funcionando 🚀" });
});

app.get("/api/test-protected", authMiddleware, (req, res) => {
    res.json({
        message: "Ruta protegida OK",
        user: req.user
    });
});


// Rutas protegidas

app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);

module.exports = app;

