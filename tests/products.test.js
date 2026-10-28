import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

// require y no import: así la prueba y la app comparten el mismo objeto del servicio
const app = require("../src/app");
const pool = require("../src/config/db");
const productsService = require("../src/services/products.service");

const validProduct = { name: "Paracetamol", quantity: 10 };

afterEach(() => vi.restoreAllMocks());
afterAll(() => pool.end());

describe("GET /api/products-to-buy", () => {
  it("responde la lista de productos", async () => {
    vi.spyOn(productsService, "getAll").mockResolvedValue([{ id: 1 }]);

    const res = await request(app).get("/api/products-to-buy");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1 }]);
  });

  it("responde 500 con mensaje genérico si falla la base", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(productsService, "getAll").mockRejectedValue(new Error("SQL"));

    const res = await request(app).get("/api/products-to-buy");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error interno del servidor");
  });
});

describe("POST /api/purchase-items", () => {
  it("crea el producto y responde su id", async () => {
    const create = vi
      .spyOn(productsService, "create")
      .mockResolvedValue({ insertId: 7n });

    const res = await request(app)
      .post("/api/purchase-items")
      .send(validProduct);

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(7);
    expect(create).toHaveBeenCalledWith(validProduct);
  });

  it.each([
    [{ quantity: 1 }, "El nombre es obligatorio"],
    [{ name: "   ", quantity: 1 }, "El nombre es obligatorio"],
    [
      { name: "x".repeat(201), quantity: 1 },
      "El nombre no puede tener más de 200 caracteres",
    ],
    [
      { name: "A", quantity: 0 },
      "La cantidad debe ser un número entero mayor a 0",
    ],
    [
      { name: "A", quantity: 1.5 },
      "La cantidad debe ser un número entero mayor a 0",
    ],
    [
      { ...validProduct, price: -1 },
      "El precio debe ser un número mayor o igual a 0",
    ],
    [
      { ...validProduct, price: "10" },
      "El precio debe ser un número mayor o igual a 0",
    ],
    [
      { ...validProduct, laboratoryId: 0 },
      "laboratoryId debe ser un número entero mayor a 0",
    ],
    [
      { ...validProduct, sectorId: "2" },
      "sectorId debe ser un número entero mayor a 0",
    ],
    [{ ...validProduct, category: 5 }, "category debe ser texto"],
    [{ ...validProduct, tags: "dolor" }, "tags debe ser una lista de textos"],
    [{ ...validProduct, tags: [1] }, "tags debe ser una lista de textos"],
    [
      { ...validProduct, isMedicine: "si" },
      "isMedicine debe ser verdadero o falso",
    ],
    [[validProduct], "El cuerpo de la petición debe ser un objeto JSON"],
  ])("rechaza %j con 400", async (body, message) => {
    const create = vi.spyOn(productsService, "create");

    const res = await request(app).post("/api/purchase-items").send(body);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(message);
    expect(create).not.toHaveBeenCalled();
  });
});

describe("PUT /api/products-to-buy/:id", () => {
  it("actualiza el producto", async () => {
    vi.spyOn(productsService, "update").mockResolvedValue({ affectedRows: 1 });

    const res = await request(app)
      .put("/api/products-to-buy/1")
      .send(validProduct);

    expect(res.status).toBe(200);
  });

  it("responde 404 si el producto no existe", async () => {
    vi.spyOn(productsService, "update").mockResolvedValue({ affectedRows: 0 });

    const res = await request(app)
      .put("/api/products-to-buy/99")
      .send(validProduct);

    expect(res.status).toBe(404);
  });

  it("responde 400 si los datos no son válidos", async () => {
    const res = await request(app).put("/api/products-to-buy/1").send({});

    expect(res.status).toBe(400);
  });
});

describe.each([
  ["patch", "/api/products-to-buy/:id/complete", "setComplete"],
  ["patch", "/api/products-to-buy/:id/incomplete", "setComplete"],
  ["delete", "/api/products-to-buy/:id", "remove"],
])("%s %s", (method, path, serviceFn) => {
  it("responde 200 si el producto existe", async () => {
    vi.spyOn(productsService, serviceFn).mockResolvedValue({ affectedRows: 1 });

    const res = await request(app)[method](path.replace(":id", "1"));

    expect(res.status).toBe(200);
  });

  it("responde 404 si el producto no existe", async () => {
    vi.spyOn(productsService, serviceFn).mockResolvedValue({ affectedRows: 0 });

    const res = await request(app)[method](path.replace(":id", "99"));

    expect(res.status).toBe(404);
  });

  it.each(["abc", "0", "-1", "1.5"])(
    "responde 400 con el ID %s",
    async (id) => {
      const res = await request(app)[method](path.replace(":id", id));

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("El ID del producto no es válido");
    },
  );
});

it("marca como comprado o pendiente según la ruta", async () => {
  const setComplete = vi
    .spyOn(productsService, "setComplete")
    .mockResolvedValue({ affectedRows: 1 });

  await request(app).patch("/api/products-to-buy/3/complete");
  await request(app).patch("/api/products-to-buy/3/incomplete");

  expect(setComplete).toHaveBeenNthCalledWith(1, "3", true);
  expect(setComplete).toHaveBeenNthCalledWith(2, "3", false);
});
