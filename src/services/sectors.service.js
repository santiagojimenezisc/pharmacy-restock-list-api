const pool = require("../config/db");

const getAll = () =>
  pool.query("SELECT id, name, description, active FROM sectors");

const getSummary = async () => {
  const sectors = await pool.query(`
    SELECT
      sec.id AS sectorId,
      sec.name AS sectorName,
      COUNT(pi.id) AS totalProducts,
      COUNT(
        CASE
          WHEN pi.is_complete = 0 THEN 1
        END
      ) AS incompleteProducts

    FROM sectors sec

    LEFT JOIN purchase_items pi
      ON sec.id = pi.sector_id

    GROUP BY
      sec.id,
      sec.name

    ORDER BY sec.id
  `);

  return sectors.map((sector) => ({
    sectorId: Number(sector.sectorId),
    sectorName: sector.sectorName,
    totalProducts: Number(sector.totalProducts),
    incompleteProducts: Number(sector.incompleteProducts),
  }));
};

const getProducts = async (sectorId) => {
  const products = await pool.query(
    `
      SELECT
        pi.id,
        pi.name,
        pi.active_substance AS activeSubstance,
        pi.description,
        pi.quantity,
        pi.grammage,
        pi.price,

        pi.laboratory_id AS laboratoryId,
        l.name AS laboratoryName,

        pi.supplier_id AS supplierId,
        s.name AS supplierName,

        pi.sector_id AS sectorId,
        sec.name AS sectorName,

        pi.category,
        pi.tags,
        pi.is_medicine AS isMedicine,
        pi.is_complete AS isComplete,
        pi.created_at AS createdAt

      FROM purchase_items pi

      LEFT JOIN laboratories l
        ON pi.laboratory_id = l.id

      LEFT JOIN suppliers s
        ON pi.supplier_id = s.id

      LEFT JOIN sectors sec
        ON pi.sector_id = sec.id

      WHERE pi.sector_id = ?

      ORDER BY pi.created_at DESC
    `,
    [sectorId],
  );

  return products.map((product) => ({
    ...product,
    id: Number(product.id),
    quantity: Number(product.quantity),
    price: Number(product.price),
    laboratoryId:
      product.laboratoryId === null ? null : Number(product.laboratoryId),
    supplierId:
      product.supplierId === null ? null : Number(product.supplierId),
    sectorId: Number(product.sectorId),
    isMedicine: Boolean(product.isMedicine),
    isComplete: Boolean(product.isComplete),
    tags: product.tags ?? "",
  }));
};

// La intercalación de la tabla ignora acentos y mayúsculas: "anaquel 1" choca con "Anaquel 1"
const nameExists = async (name, excludeId = 0) => {
  const rows = await pool.query(
    "SELECT id FROM sectors WHERE name = ? AND id <> ?",
    [name, excludeId],
  );
  return rows.length > 0;
};

const countProducts = async (id) => {
  const [row] = await pool.query(
    "SELECT COUNT(*) AS total FROM purchase_items WHERE sector_id = ?",
    [id],
  );
  return Number(row.total);
};

const create = ({ name, description }) =>
  pool.query("INSERT INTO sectors (name, description) VALUES (?, ?)", [
    name,
    description ?? null,
  ]);

// Si no llega descripción se conserva la actual, para poder solo renombrar
const update = (id, { name, description }) =>
  pool.query(
    "UPDATE sectors SET name = ?, description = COALESCE(?, description) WHERE id = ?",
    [name, description ?? null, id],
  );

const remove = (id) => pool.query("DELETE FROM sectors WHERE id = ?", [id]);

module.exports = {
  getAll,
  getSummary,
  getProducts,
  nameExists,
  countProducts,
  create,
  update,
  remove,
};
