const pool = require("../config/db");

const getAll = () => pool.query("SELECT id, name, active FROM laboratories");

module.exports = { getAll };
