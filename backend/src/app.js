
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const app = express();

const categoriesRoutes = require("./routes/categories.routes");
const productsRoutes = require("./routes/products.routes");


const authMiddleware = require("./middlewares/auth.middleware");
const storeRoutes = require("./routes/store.routes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


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
app.use("/api/store", storeRoutes);

module.exports = app;

