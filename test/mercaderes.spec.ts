import { describe, expect, test, beforeEach } from "vitest";
import { Mercader } from "../src/models/mercaderes.js";

describe("Mercader", () => {
  let mercader: Mercader;

  beforeEach(() => {
    mercader = new Mercader("001", "Geralt", "Herrero", "Novigrado");
  });

  test("debería crear un mercader correctamente", () => {
    expect(mercader.idUnico).toBe("001");
    expect(mercader.nombre).toBe("Geralt");
    expect(mercader.tipo).toBe("Herrero");
    expect(mercader.ubicacion).toBe("Novigrado");
  });

  test("debería obtener el idUnico correctamente", () => {
    expect(mercader.idUnico).toBe("001");
  });

  test("debería obtener el nombre correctamente", () => {
    expect(mercader.nombre).toBe("Geralt");
  });

  test("debería obtener el tipo correctamente", () => {
    expect(mercader.tipo).toBe("Herrero");
  });

  test("debería obtener la ubicación correctamente", () => {
    expect(mercader.ubicacion).toBe("Novigrado");
  });

  test("debería permitir actualizar el idUnico", () => {
    mercader.idUnico = "002";
    expect(mercader.idUnico).toBe("002");
  });

  test("debería permitir actualizar el nombre", () => {
    mercader.nombre = "Yennefer";
    expect(mercader.nombre).toBe("Yennefer");
  });

  test("debería permitir actualizar el tipo", () => {
    mercader.tipo = "Alquimista";
    expect(mercader.tipo).toBe("Alquimista");
  });

  test("debería permitir actualizar la ubicación", () => {
    mercader.ubicacion = "Skellige";
    expect(mercader.ubicacion).toBe("Skellige");
  });
});
