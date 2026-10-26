const { Router } = require("express");
const productsController = require("../controllers/products.controller");
const validateId = require("../middlewares/validateId");

const router = Router();

router.param("id", validateId("El ID del producto no es válido"));

/**
 * @swagger
 * /api/purchase-items:
 *   post:
 *     summary: Agregar un producto a la lista de compras
 *     tags: [Productos a comprar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paracetamol
 *               activeSubstance:
 *                 type: string
 *                 example: Paracetamol
 *               description:
 *                 type: string
 *                 example: Analgésico y antipirético
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               grammage:
 *                 type: string
 *                 example: 500 mg
 *               price:
 *                 type: number
 *                 example: 35.50
 *               laboratoryId:
 *                 type: integer
 *                 example: 5
 *               supplierId:
 *                 type: integer
 *                 example: 1
 *               sectorId:
 *                 type: integer
 *                 example: 1
 *               category:
 *                 type: string
 *                 example: Analgésicos
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - dolor
 *                   - fiebre
 *               isMedicine:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Producto agregado correctamente
 *       400:
 *         description: Datos no válidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/purchase-items", productsController.create);

/**
 * @swagger
 * /api/products-to-buy:
 *   get:
 *     summary: Obtener todos los productos a comprar
 *     tags: [Productos a comprar]
 *     responses:
 *       200:
 *         description: Lista de productos a comprar
 */
router.get("/products-to-buy", productsController.getAll);

/**
 * @swagger
 * /api/products-to-buy/{id}/complete:
 *   patch:
 *     summary: Marcar un producto como comprado
 *     tags: [Productos a comprar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a marcar como completado
 *         example: 1
 *     responses:
 *       200:
 *         description: Producto marcado como comprado
 *       400:
 *         description: Datos o ID no válidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/products-to-buy/:id/complete", productsController.markComplete);

/**
 * @swagger
 * /api/products-to-buy/{id}/incomplete:
 *   patch:
 *     summary: Marcar un producto como pendiente
 *     tags: [Productos a comprar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a marcar como pendiente
 *         example: 1
 *     responses:
 *       200:
 *         description: Producto marcado como pendiente
 *       400:
 *         description: Datos o ID no válidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch(
  "/products-to-buy/:id/incomplete",
  productsController.markIncomplete,
);

/**
 * @swagger
 * /api/products-to-buy/{id}:
 *   delete:
 *     summary: Eliminar un producto de la lista de compras
 *     tags: [Productos a comprar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       400:
 *         description: Datos o ID no válidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/products-to-buy/:id", productsController.remove);

/**
 * @swagger
 * /api/products-to-buy/{id}:
 *   put:
 *     summary: Actualizar un producto de la lista de compras
 *     tags: [Productos a comprar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Portem
 *               activeSubstance:
 *                 type: string
 *                 example: Paracetamol
 *               description:
 *                 type: string
 *                 example: 10 tabletas
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               grammage:
 *                 type: string
 *                 example: 500 mg
 *               price:
 *                 type: number
 *                 example: 35.50
 *               laboratoryId:
 *                 type: integer
 *                 example: 5
 *               supplierId:
 *                 type: integer
 *                 example: 1
 *               sectorId:
 *                 type: integer
 *                 example: 1
 *               category:
 *                 type: string
 *                 example: Analgésicos
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - dolor
 *                   - fiebre
 *               isMedicine:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Datos o ID no válidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/products-to-buy/:id", productsController.update);

module.exports = router;
