const sectorsService = require("../services/sectors.service");

const getAll = async (req, res) => {
  res.json(await sectorsService.getAll());
};

const getSummary = async (req, res) => {
  res.json(await sectorsService.getSummary());
};

const getProducts = async (req, res) => {
  res.json(await sectorsService.getProducts(Number(req.params.id)));
};

module.exports = { getAll, getSummary, getProducts };
