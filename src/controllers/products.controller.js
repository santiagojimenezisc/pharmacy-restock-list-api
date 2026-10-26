const productsService = require("../services/products.service");

const notFound = (res) =>
  res.status(404).json({ message: "Producto no encontrado" });

const isOptionalString = (value) => value == null || typeof value === "string";
const isOptionalId = (value) =>
  value == null || (Number.isInteger(value) && value > 0);

// Devuelve el primer error encontrado, o null si el producto es válido
const validateProduct = (product) => {
  if (!product || typeof product !== "object" || Array.isArray(product)) {
    return "El cuerpo de la petición debe ser un objeto JSON";
  }

  const { name, quantity, price, tags, isMedicine } = product;

  if (typeof name !== "string" || name.trim() === "") {
    return "El nombre es obligatorio";
  }
  if (name.length > 200) {
    return "El nombre no puede tener más de 200 caracteres";
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return "La cantidad debe ser un número entero mayor a 0";
  }
  if (price != null && (typeof price !== "number" || price < 0)) {
    return "El precio debe ser un número mayor o igual a 0";
  }
  for (const field of ["laboratoryId", "supplierId", "sectorId"]) {
    if (!isOptionalId(product[field])) {
      return `${field} debe ser un número entero mayor a 0`;
    }
  }
  for (const field of ["activeSubstance", "description", "grammage", "category"]) {
    if (!isOptionalString(product[field])) {
      return `${field} debe ser texto`;
    }
  }
  if (
    tags != null &&
    (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string"))
  ) {
    return "tags debe ser una lista de textos";
  }
  if (isMedicine != null && typeof isMedicine !== "boolean") {
    return "isMedicine debe ser verdadero o falso";
  }

  return null;
};

const getAll = async (req, res) => {
  res.json(await productsService.getAll());
};

const create = async (req, res) => {
  const error = validateProduct(req.body);

  if (error) return res.status(400).json({ message: error });

  const result = await productsService.create(req.body);

  res.status(201).json({
    message: "Producto agregado correctamente",
    id: Number(result.insertId),
  });
};

const update = async (req, res) => {
  const error = validateProduct(req.body);

  if (error) return res.status(400).json({ message: error });

  const result = await productsService.update(req.params.id, req.body);

  if (result.affectedRows === 0) return notFound(res);

  res.json({ message: "Producto actualizado correctamente" });
};

const markComplete = async (req, res) => {
  const result = await productsService.setComplete(req.params.id, true);

  if (result.affectedRows === 0) return notFound(res);

  res.json({ message: "Producto marcado como completado" });
};

const markIncomplete = async (req, res) => {
  const result = await productsService.setComplete(req.params.id, false);

  if (result.affectedRows === 0) return notFound(res);

  res.json({ message: "Producto marcado como pendiente" });
};

const remove = async (req, res) => {
  const result = await productsService.remove(req.params.id);

  if (result.affectedRows === 0) return notFound(res);

  res.json({ message: "Producto eliminado correctamente" });
};

module.exports = {
  getAll,
  create,
  update,
  markComplete,
  markIncomplete,
  remove,
};
