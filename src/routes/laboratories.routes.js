const { Router } = require("express");
const laboratoriesController = require("../controllers/laboratories.controller");

const router = Router();

/**
 * @swagger
 * /api/laboratories:
 *   get:
 *     summary: Obtener todos los laboratorios
 *     tags:
 *       - Laboratorios
 *     responses:
 *       200:
 *         description: Lista de laboratorios
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
 *                   active:
 *                     type: boolean
 */
router.get("/", laboratoriesController.getAll);

module.exports = router;
