import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

// require y no import: así la prueba y la app comparten el mismo objeto del servicio
const app = require("../src/app");
const pool = require("../src/config/db");
const sectorsService = require("../src/services/sectors.service");

afterEach(() => vi.restoreAllMocks());
afterAll(() => pool.end());

describe("GET /api/sectors", () => {
  it("/summary no se toma como un ID", async () => {
    vi.spyOn(sectorsService, "getSummary").mockResolvedValue([]);

    const res = await request(app).get("/api/sectors/summary");

    expect(res.status).toBe(200);
  });

  it("/:id responde los productos del sector", async () => {
    const getProducts = vi
      .spyOn(sectorsService, "getProducts")
      .mockResolvedValue([{ id: 1 }]);

    const res = await request(app).get("/api/sectors/2");

    expect(res.status).toBe(200);
    expect(getProducts).toHaveBeenCalledWith(2);
  });

  it("/:id responde 400 con un ID no válido", async () => {
    const res = await request(app).get("/api/sectors/abc");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("El ID del sector no es válido");
  });
});

describe("POST /api/sectors", () => {
  it("crea el sector con el nombre sin espacios sobrantes", async () => {
    vi.spyOn(sectorsService, "nameExists").mockResolvedValue(false);
    const create = vi
      .spyOn(sectorsService, "create")
      .mockResolvedValue({ insertId: 4n });

    const res = await request(app)
      .post("/api/sectors")
      .send({ name: "  Refrigerador  " });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(4);
    expect(create).toHaveBeenCalledWith({ name: "Refrigerador" });
  });

  it("responde 409 si el nombre ya existe", async () => {
    vi.spyOn(sectorsService, "nameExists").mockResolvedValue(true);
    const create = vi.spyOn(sectorsService, "create");

    const res = await request(app)
      .post("/api/sectors")
      .send({ name: "Anaquel 1" });

    expect(res.status).toBe(409);
    expect(create).not.toHaveBeenCalled();
  });

  it.each([
    [{}, "El nombre es obligatorio"],
    [
      { name: "x".repeat(101) },
      "El nombre no puede tener más de 100 caracteres",
    ],
    [{ name: "A", description: 5 }, "description debe ser texto"],
    [
      { name: "A", description: "x".repeat(256) },
      "La descripción no puede tener más de 255 caracteres",
    ],
  ])("rechaza %j con 400", async (body, message) => {
    const res = await request(app).post("/api/sectors").send(body);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(message);
  });
});

describe("PUT /api/sectors/:id", () => {
  it("ignora su propio nombre al revisar duplicados", async () => {
    const nameExists = vi
      .spyOn(sectorsService, "nameExists")
      .mockResolvedValue(false);
    vi.spyOn(sectorsService, "update").mockResolvedValue({ affectedRows: 1 });

    const res = await request(app)
      .put("/api/sectors/3")
      .send({ name: "Anaquel 3" });

    expect(res.status).toBe(200);
    expect(nameExists).toHaveBeenCalledWith("Anaquel 3", 3);
  });

  it("responde 404 si el sector no existe", async () => {
    vi.spyOn(sectorsService, "nameExists").mockResolvedValue(false);
    vi.spyOn(sectorsService, "update").mockResolvedValue({ affectedRows: 0 });

    const res = await request(app)
      .put("/api/sectors/99")
      .send({ name: "Nuevo" });

    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/sectors/:id", () => {
  it("borra un sector sin productos", async () => {
    vi.spyOn(sectorsService, "countProducts").mockResolvedValue(0);
    vi.spyOn(sectorsService, "remove").mockResolvedValue({ affectedRows: 1 });

    const res = await request(app).delete("/api/sectors/2");

    expect(res.status).toBe(200);
  });

  it("responde 409 si el sector tiene productos", async () => {
    vi.spyOn(sectorsService, "countProducts").mockResolvedValue(3);
    const remove = vi.spyOn(sectorsService, "remove");

    const res = await request(app).delete("/api/sectors/2");

    expect(res.status).toBe(409);
    expect(remove).not.toHaveBeenCalled();
  });

  it("responde 404 si el sector no existe", async () => {
    vi.spyOn(sectorsService, "countProducts").mockResolvedValue(0);
    vi.spyOn(sectorsService, "remove").mockResolvedValue({ affectedRows: 0 });

    const res = await request(app).delete("/api/sectors/99");

    expect(res.status).toBe(404);
  });
});
