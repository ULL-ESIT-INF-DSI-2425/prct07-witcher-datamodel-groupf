
import inquirer from "inquirer";
import { Inventario } from "./inventario.js";
import { Bien } from "./bienes.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercaderes.js";

const inventario = new Inventario();

async function menu() {
  while (true) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "Selecciona una opción:",
        choices: [
          "Añadir Bien",
          "Añadir Mercader",
          "Añadir Cliente",
          "Consultar Stock",
          "Salir",
        ],
      },
    ]);

    switch (opcion) {
      case "Añadir Bien":
        const nuevoBien = await inquirer.prompt([
          { type: "input", name: "nombre", message: "Nombre del bien:" },
          { type: "input", name: "descripcion", message: "Descripción:" },
          { type: "input", name: "material", message: "Material:" },
          { type: "number", name: "peso", message: "Peso:" },
          { type: "number", name: "valorCoronas", message: "Valor en coronas:" },
        ]);
        inventario.agregarBien(new Bien(Date.now().toString(), nuevoBien.nombre, nuevoBien.descripcion, nuevoBien.material, nuevoBien.peso, nuevoBien.valorCoronas));
        console.log("Bien añadido correctamente.");
        break;

      case "Consultar Stock":
        console.log("Stock actual:", inventario.obtenerStock());
        break;

      case "Salir":
        return;
    }
  }
}

menu();
