const pool = require("../config/db");

const getAll = async () => {
  const products = await pool.query(`
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

    ORDER BY pi.created_at DESC
  `);

  return products.map((product) => ({
    ...product,
    isMedicine: Boolean(product.isMedicine),
    isComplete: Boolean(product.isComplete),
  }));
};

const create = (product) =>
  pool.query(
    `
      INSERT INTO purchase_items (
        name,
        active_substance,
        description,
        quantity,
        grammage,
        price,
        laboratory_id,
        supplier_id,
        sector_id,
        category,
        tags,
        is_medicine
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      product.name,
      product.activeSubstance,
      product.description,
      product.quantity,
      product.grammage,
      product.price,
      product.laboratoryId,
      product.supplierId,
      product.sectorId,
      product.category,
      JSON.stringify(product.tags),
      product.isMedicine,
    ],
  );

const update = (id, product) =>
  pool.query(
    `
      UPDATE purchase_items
      SET
        name = ?,
        active_substance = ?,
        description = ?,
        quantity = ?,
        grammage = ?,
        price = ?,
        laboratory_id = ?,
        supplier_id = ?,
        sector_id = ?,
        category = ?,
        tags = ?,
        is_medicine = ?
      WHERE id = ?
    `,
    [
      product.name,
      product.activeSubstance,
      product.description,
      product.quantity,
      product.grammage,
      product.price,
      product.laboratoryId,
      product.supplierId,
      product.sectorId,
      product.category,
      JSON.stringify(product.tags),
      product.isMedicine,
      id,
    ],
  );

const setComplete = (id, isComplete) =>
  pool.query("UPDATE purchase_items SET is_complete = ? WHERE id = ?", [
    isComplete,
    id,
  ]);

const remove = (id) =>
  pool.query("DELETE FROM purchase_items WHERE id = ?", [id]);

module.exports = { getAll, create, update, setComplete, remove };
