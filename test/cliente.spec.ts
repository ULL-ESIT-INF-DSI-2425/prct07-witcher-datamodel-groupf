import { describe, expect, test, beforeEach } from "vitest";
import { Cliente } from "../src/models/cliente.js";

describe("Cliente", () => {
  let cliente: Cliente;

  beforeEach(() => {
    cliente = new Cliente("001", "Gandalf", "Mago", "Torre de Orthanc");
  });

  test("debería crear un cliente correctamente", () => {
    expect(cliente.idUnico).toBe("001");
    expect(cliente.nombre).toBe("Gandalf");
    expect(cliente.raza).toBe("Mago");
    expect(cliente.ubicacion).toBe("Torre de Orthanc");
  });

  test("debería obtener el idUnico correctamente", () => {
    expect(cliente.idUnico).toBe("001");
  });

  test("debería obtener el nombre correctamente", () => {
    expect(cliente.nombre).toBe("Gandalf");
  });

  test("debería obtener la raza correctamente", () => {
    expect(cliente.raza).toBe("Mago");
  });

  test("debería obtener la ubicación correctamente", () => {
    expect(cliente.ubicacion).toBe("Torre de Orthanc");
  });

  test("debería permitir actualizar el idUnico", () => {
    cliente.idUnico = "002";
    expect(cliente.idUnico).toBe("002");
  });

  test("debería permitir actualizar el nombre", () => {
    cliente.nombre = "Saruman";
    expect(cliente.nombre).toBe("Saruman");
  });

  test("debería permitir actualizar la raza", () => {
    cliente.raza = "Istari";
    expect(cliente.raza).toBe("Istari");
  });

  test("debería permitir actualizar la ubicación", () => {
    cliente.ubicacion = "Edoras";
    expect(cliente.ubicacion).toBe("Edoras");
  });
});
