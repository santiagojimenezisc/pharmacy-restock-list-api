const { Router } = require("express");
const suppliersController = require("../controllers/suppliers.controller");

const router = Router();

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags:
 *       - Proveedores
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get("/", suppliersController.getAll);

module.exports = router;
