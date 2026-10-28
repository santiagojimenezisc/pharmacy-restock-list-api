const { Router } = require("express");
const sectorsController = require("../controllers/sectors.controller");
const validateId = require("../middlewares/validateId");

const router = Router();

router.param("id", validateId("El ID del sector no es válido"));

/**
 * @swagger
 * /api/sectors:
 *   get:
 *     summary: Obtener las ubicaciones de los productos
 *     tags:
 *       - Sectores
 *     responses:
 *       200:
 *         description: Lista de sectores o ubicaciones
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
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get("/", sectorsController.getAll);

/**
 * @swagger
 * /api/sectors/summary:
 *   get:
 *     summary: Obtener el resumen de productos por sector
 *     tags:
 *       - Sectores
 *     responses:
 *       200:
 *         description: Lista de sectores con el total de productos y los productos pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sectorId:
 *                     type: integer
 *                     example: 1
 *                   sectorName:
 *                     type: string
 *                     example: Anaquel 1
 *                   totalProducts:
 *                     type: integer
 *                     example: 3
 *                   incompleteProducts:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
// Va antes de "/:id" para que "summary" no se tome como un ID
router.get("/summary", sectorsController.getSummary);

/**
 * @swagger
 * /api/sectors/{id}:
 *   get:
 *     summary: Obtener los productos de un sector
 *     tags:
 *       - Sectores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del sector
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Lista de productos pertenecientes al sector
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 15
 *                   name:
 *                     type: string
 *                     example: Paracetamol
 *                   activeSubstance:
 *                     type: string
 *                     example: Paracetamol
 *                   description:
 *                     type: string
 *                     example: Tabletas
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   grammage:
 *                     type: string
 *                     example: 500 mg
 *                   price:
 *                     type: number
 *                     example: 18
 *                   laboratoryId:
 *                     type: integer
 *                     example: 1
 *                   laboratoryName:
 *                     type: string
 *                     example: AMSA Laboratorios
 *                   supplierId:
 *                     type: integer
 *                     example: 2
 *                   supplierName:
 *                     type: string
 *                     example: Dimen Tultitlán
 *                   sectorId:
 *                     type: integer
 *                     example: 2
 *                   sectorName:
 *                     type: string
 *                     example: Anaquel 2
 *                   category:
 *                     type: string
 *                     example: Analgésicos
 *                   tags:
 *                     oneOf:
 *                       - type: array
 *                         items:
 *                           type: string
 *                       - type: string
 *                     example:
 *                       - dolor
 *                       - analgésico
 *                   isMedicine:
 *                     type: boolean
 *                     example: true
 *                   isComplete:
 *                     type: boolean
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-10-08T12:00:00.000Z"
 *       400:
 *         description: El ID del sector no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El ID del sector no es válido
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.get("/:id", sectorsController.getProducts);

/**
 * @swagger
 * /api/sectors:
 *   post:
 *     summary: Agregar un sector
 *     tags:
 *       - Sectores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Refrigerador
 *               description:
 *                 type: string
 *                 example: Junto a la caja
 *     responses:
 *       201:
 *         description: Sector agregado correctamente
 *       400:
 *         description: Datos no válidos
 *       409:
 *         description: Ya existe un anaquel con ese nombre
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", sectorsController.create);

/**
 * @swagger
 * /api/sectors/{id}:
 *   put:
 *     summary: Actualizar un sector
 *     description: Si no se envía la descripción, se conserva la actual.
 *     tags:
 *       - Sectores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Anaquel de vitaminas
 *               description:
 *                 type: string
 *                 example: Pasillo 2
 *     responses:
 *       200:
 *         description: Sector actualizado correctamente
 *       400:
 *         description: Datos o ID no válidos
 *       404:
 *         description: Sector no encontrado
 *       409:
 *         description: Ya existe un anaquel con ese nombre
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id", sectorsController.update);

/**
 * @swagger
 * /api/sectors/{id}:
 *   delete:
 *     summary: Eliminar un sector sin productos
 *     tags:
 *       - Sectores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Sector eliminado correctamente
 *       400:
 *         description: El ID del sector no es válido
 *       404:
 *         description: Sector no encontrado
 *       409:
 *         description: No se puede eliminar un anaquel con productos
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", sectorsController.remove);

module.exports = router;
