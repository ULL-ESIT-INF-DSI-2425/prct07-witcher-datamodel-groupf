// src/index.ts
import inquirer from "inquirer";
import { Inventario } from "./Inventario.js";
import { Bien } from "./bienes.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercaderes.js";

const inventario = new Inventario();

async function menuPrincipal() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué acción deseas realizar?",
      choices: [
        "Añadir un bien",
        "Añadir un mercader",
        "Añadir un cliente",
        "Consultar bienes",
        "Salir"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Añadir un bien":
      await agregarBien();
      break;
    case "Añadir un mercader":
      await agregarMercader();
      break;
    case "Añadir un cliente":
      await agregarCliente();
      break;
    case "Consultar bienes":
      console.log(inventario.listarBienes());
      break;
    case "Salir":
      console.log("¡Hasta luego!");
      return;
  }

  await menuPrincipal();
}

async function agregarBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien:" },
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien:" },
    { type: "number", name: "valor", message: "Valor del bien en coronas:" }
  ]);

  const nuevoBien = new Bien(
    respuestas.id,
    respuestas.nombre,
    respuestas.descripcion,
    respuestas.material,
    respuestas.peso,
    respuestas.valor
  );

  inventario.agregarBien(nuevoBien);
  console.log("Bien añadido con éxito.");
}

async function agregarMercader() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader:" },
    { type: "input", name: "nombre", message: "Nombre del mercader:" },
    { type: "input", name: "tipo", message: "Tipo de mercader:" },
    { type: "input", name: "ubicacion", message: "Ubicación:" }
  ]);

  const nuevoMercader = new Mercader(
    respuestas.id,
    respuestas.nombre,
    respuestas.tipo,
    respuestas.ubicacion
  );

  inventario.agregarMercader(nuevoMercader);
  console.log("Mercader añadido con éxito.");
}

async function agregarCliente() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente:" },
    { type: "input", name: "nombre", message: "Nombre del cliente:" },
    { type: "input", name: "raza", message: "Raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Ubicación:" }
  ]);

  const nuevoCliente = new Cliente(
    respuestas.id,
    respuestas.nombre,
    respuestas.raza,
    respuestas.ubicacion
  );

  inventario.agregarCliente(nuevoCliente);
  console.log("Cliente añadido con éxito.");
}

menuPrincipal();
