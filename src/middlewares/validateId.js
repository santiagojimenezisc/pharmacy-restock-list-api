// Se usa con router.param: corre antes de cualquier ruta que tenga :id
const validateId = (message) => (req, res, next, id) => {
  const value = Number(id);

  if (!Number.isInteger(value) || value <= 0) {
    return res.status(400).json({ message });
  }

  next();
};

module.exports = validateId;
