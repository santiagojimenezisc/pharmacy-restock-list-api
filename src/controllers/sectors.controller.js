const sectorsService = require("../services/sectors.service");

const notFound = (res) =>
  res.status(404).json({ message: "Sector no encontrado" });

const duplicated = (res) =>
  res.status(409).json({ message: "Ya existe un anaquel con ese nombre" });

// Devuelve el primer error encontrado, o null si el sector es válido
const validateSector = (sector) => {
  if (!sector || typeof sector !== "object" || Array.isArray(sector)) {
    return "El cuerpo de la petición debe ser un objeto JSON";
  }

  const { name, description } = sector;

  if (typeof name !== "string" || name.trim() === "") {
    return "El nombre es obligatorio";
  }
  if (name.trim().length > 100) {
    return "El nombre no puede tener más de 100 caracteres";
  }
  if (description != null && typeof description !== "string") {
    return "description debe ser texto";
  }
  if (description?.length > 255) {
    return "La descripción no puede tener más de 255 caracteres";
  }

  return null;
};

const getAll = async (req, res) => {
  res.json(await sectorsService.getAll());
};

const getSummary = async (req, res) => {
  res.json(await sectorsService.getSummary());
};

const getProducts = async (req, res) => {
  res.json(await sectorsService.getProducts(Number(req.params.id)));
};

const create = async (req, res) => {
  const error = validateSector(req.body);

  if (error) return res.status(400).json({ message: error });

  const sector = { ...req.body, name: req.body.name.trim() };

  if (await sectorsService.nameExists(sector.name)) return duplicated(res);

  const result = await sectorsService.create(sector);

  res.status(201).json({
    message: "Sector agregado correctamente",
    id: Number(result.insertId),
  });
};

const update = async (req, res) => {
  const error = validateSector(req.body);

  if (error) return res.status(400).json({ message: error });

  const id = Number(req.params.id);
  const sector = { ...req.body, name: req.body.name.trim() };

  if (await sectorsService.nameExists(sector.name, id)) return duplicated(res);

  const result = await sectorsService.update(id, sector);

  if (result.affectedRows === 0) return notFound(res);

  res.json({ message: "Sector actualizado correctamente" });
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  // Los productos apuntan al sector con una llave foránea; no se borran en cascada
  if ((await sectorsService.countProducts(id)) > 0) {
    return res.status(409).json({
      message: "No se puede eliminar un anaquel con productos",
    });
  }

  const result = await sectorsService.remove(id);

  if (result.affectedRows === 0) return notFound(res);

  res.json({ message: "Sector eliminado correctamente" });
};

module.exports = { getAll, getSummary, getProducts, create, update, remove };
