const pool = require("../config/db");

const getAll = () =>
  pool.query("SELECT id, name, phone, email, active FROM suppliers");

module.exports = { getAll };
