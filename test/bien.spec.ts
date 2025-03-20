import { describe, expect, test, beforeEach } from "vitest";
import { Bien } from "../src/bienes";

describe("Bien", () => {
  let bien: Bien;

  beforeEach(() => {
    bien = new Bien(
      "123ABC",
      "Espada de Plata",
      "Una espada forjada con plata pura.",
      "Plata",
      3.5,
      1500
    );
  });

  test("debería crear un bien correctamente", () => {
    expect(bien.idUnico).toBe("123ABC");
    expect(bien.nombre).toBe("Espada de Plata");
    expect(bien.descripcion).toBe("Una espada forjada con plata pura.");
    expect(bien.material).toBe("Plata");
    expect(bien.peso).toBe(3.5);
    expect(bien.valorCoronas).toBe(1500);
  });

  test("debería obtener el idUnico correctamente", () => {
    expect(bien.idUnico).toBe("123ABC");
  });

  test("debería obtener el nombre correctamente", () => {
    expect(bien.nombre).toBe("Espada de Plata");
  });

  test("debería obtener la descripción correctamente", () => {
    expect(bien.descripcion).toBe("Una espada forjada con plata pura.");
  });

  test("debería obtener el material correctamente", () => {
    expect(bien.material).toBe("Plata");
  });

  test("debería obtener el peso correctamente", () => {
    expect(bien.peso).toBe(3.5);
  });

  test("debería obtener el valor en coronas correctamente", () => {
    expect(bien.valorCoronas).toBe(1500);
  });

  test("debería permitir actualizar el idUnico", () => {
    bien.idUnico = "456DEF";
    expect(bien.idUnico).toBe("456DEF");
  });

  test("debería permitir actualizar el nombre", () => {
    bien.nombre = "Escudo de Hierro";
    expect(bien.nombre).toBe("Escudo de Hierro");
  });

  test("debería permitir actualizar la descripción", () => {
    bien.descripcion = "Un escudo resistente hecho de hierro.";
    expect(bien.descripcion).toBe("Un escudo resistente hecho de hierro.");
  });

  test("debería permitir actualizar el material", () => {
    bien.material = "Hierro";
    expect(bien.material).toBe("Hierro");
  });

  test("debería permitir actualizar el peso", () => {
    bien.peso = 5.0;
    expect(bien.peso).toBe(5.0);
  });

  test("debería permitir actualizar el valor en coronas", () => {
    bien.valorCoronas = 2000;
    expect(bien.valorCoronas).toBe(2000);
  });
});