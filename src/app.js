const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const laboratoriesRoutes = require("./routes/laboratories.routes");
const suppliersRoutes = require("./routes/suppliers.routes");
const sectorsRoutes = require("./routes/sectors.routes");
const productsRoutes = require("./routes/products.routes");

const app = express();
app.use(cors({ origin: process.env.FRONT_URL }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "API Lista de resurtido trabajando correctamente",
  });
});

app.use("/api/laboratories", laboratoriesRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/sectors", sectorsRoutes);
app.use("/api", productsRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    message: status === 500 ? "Error interno del servidor" : err.message,
  });
});

module.exports = app;
