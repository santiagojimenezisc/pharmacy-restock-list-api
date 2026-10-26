const suppliersService = require("../services/suppliers.service");

const getAll = async (req, res) => {
  res.json(await suppliersService.getAll());
};

module.exports = { getAll };
