const laboratoriesService = require("../services/laboratories.service");

const getAll = async (req, res) => {
  res.json(await laboratoriesService.getAll());
};

module.exports = { getAll };
