// tests/inventario.test.ts
import { describe, expect, test } from "vitest";
import { Inventario } from "../src/models/Inventario";
import { Bien } from "../src/models/Bien";

describe("Inventario", () => {
  test("Agregar y buscar un bien", () => {
    const inventario = new Inventario();
    const bien = new Bien("1", "Espada de plata", "Una espada poderosa", "Plata", 5, 1000);

    inventario.agregarBien(bien);
    expect(inventario.buscarBien("Espada de plata")).toEqual(bien);
  });
});
