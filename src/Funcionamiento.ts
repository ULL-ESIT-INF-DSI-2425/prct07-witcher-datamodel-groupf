import inquirer from "inquirer";
import fs from "fs/promises";
import { Inventario } from "./Inventario.js";
import { Bien } from "./models/bienes.js";
import { Cliente } from "./models/cliente.js";
import { Mercader } from "./models/mercaderes.js";

export const inventario = new Inventario();

/**
 * Funcion para agregar un bien
 */
export async function agregarBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien:" },
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien:" },
    { type: "number", name: "valor", message: "Valor del bien en coronas:" }
  ]);

  try {
    // comprueba que no exista un bien con el mismo id
    const existe = inventario.buscarBienPorId(respuestas.id);
    if (existe) {
      console.log("Ya existe un bien con el mismo ID. No se puede agregar.");
      return;
    }
    // crea una clase bien con los datos y añadesela al inventario
    const nuevoBien = new Bien(
      respuestas.id,
      respuestas.nombre,
      respuestas.descripcion,
      respuestas.material,
      respuestas.peso,
      respuestas.valor
    );
    nuevoBien.guardarDatos();
    inventario.agregarBien(nuevoBien);
    console.log("Bien agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el bien:", error.message);
  }
}


/**
 * Función para agregar un mercader
 */
export async function agregarMercader() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader:" },
    { type: "input", name: "nombre", message: "Nombre del mercader:" },
    { type: "input", name: "tipo", message: "Tipo de mercader:" },
    { type: "input", name: "ubicacion", message: "Ubicación del mercader:" }
  ]);

  try {
    // Verificar si ya existe un mercader con el mismo ID
    const existe = inventario.buscarMercaderPorId(respuestas.id.trim());
    if (existe) {
      console.log("Ya existe un mercader con el mismo ID. No se puede agregar.");
      return;
    }

    // Crear un nuevo mercader y agregarlo al inventario
    const nuevoMercader = new Mercader(
      respuestas.id.trim(),
      respuestas.nombre,
      respuestas.tipo,
      respuestas.ubicacion
    );
    nuevoMercader.guardarDatos();
    inventario.agregarMercader(nuevoMercader);

    console.log("Mercader agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el mercader:", error.message);
  }
}

/**
 * Función para agregar un cliente
 */
export async function agregarCliente() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente:" },
    { type: "input", name: "nombre", message: "Nombre del cliente:" },
    { type: "input", name: "raza", message: "Raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Ubicación del cliente:" }
  ]);

  try {
    // Verificar si ya existe un cliente con el mismo ID
    const existe = inventario.buscarClientePorId(respuestas.id.trim());
    if (existe) {
      console.log("Ya existe un cliente con el mismo ID. No se puede agregar.");
      return;
    }

    // Crear un nuevo cliente y agregarlo al inventario
    const nuevoCliente = new Cliente(
      respuestas.id.trim(),
      respuestas.nombre,
      respuestas.raza,
      respuestas.ubicacion
    );
    nuevoCliente.guardarDatos();
    inventario.agregarCliente(nuevoCliente);

    console.log("Cliente agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el cliente:", error.message);
  }
}

/**
 * Funcion para eliminar un bien
 */
export async function eliminarBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien a eliminar:" }
  ]);

  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    let bienes: any[] = JSON.parse(data);

    // Buscar el índice del bien a eliminar
    const indice = bienes.findIndex(bien => bien._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el bien con el ID proporcionado.");
      return;
    }

    // Eliminar el bien del arreglo
    bienes.splice(indice, 1);

    // borralo de la clase inventario
    inventario.eliminarBien(respuestas.id.trim());

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Bien.json", JSON.stringify(bienes, null, 2), "utf-8");
    console.log("Bien eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el bien:", error.message);
  }
}

/**
 * Funcion para eliminar un mercader
 */
export async function eliminarMercader() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a eliminar:" }
  ]);

  try {
    // Leer el archivo JSON de mercaderes
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    let mercaderes: any[] = JSON.parse(data);

    // Buscar el índice del mercader a eliminar
    const indice = mercaderes.findIndex(mercader => mercader._id === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el mercader con el ID proporcionado.");
      return;
    }

    // Eliminar el mercader del arreglo
    mercaderes.splice(indice, 1);

    // borralo de la clase inventario
    inventario.eliminarMercader(respuestas.id.trim());

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Mercader.json", JSON.stringify(mercaderes, null, 2), "utf-8");
    console.log("Mercader eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el mercader:", error.message);
  }
}
 
/**
 * Funcion para eliminar un cliente
 */
export async function eliminarCliente() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a eliminar:" }
  ]);

  try {
    // Leer el archivo JSON de clientes
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    let clientes: any[] = JSON.parse(data);

    // Buscar el índice del cliente a eliminar
    const indice = clientes.findIndex(cliente => cliente._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el cliente con el ID proporcionado.");
      return;
    }

    // Eliminar el cliente del arreglo
    clientes.splice(indice, 1);

    // borralo de la clase inventario
    inventario.eliminarCliente(respuestas.id.trim());

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Cliente.json", JSON.stringify(clientes, null, 2), "utf-8");
    console.log("Cliente eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el cliente:", error.message);
  }
}

export async function consultarBienes() {
  // muestra todos los bienes
  inventario.listarBienes();
}

export async function consultarMercaderes() {
  inventario.listarMercaderes();
}

export async function consultarClientes() {
  inventario.listarClientes();
}


/**
 * Funcion para modificar un bien
 */
export async function modificarBien() {
  // debe primero pedir el id del bien a modificar, y luego borrarlo y agregar uno nuevo
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del bien:" },
    { type: "input", name: "descripcion", message: "Nueva descripción del bien:" },
    { type: "input", name: "material", message: "Nuevo material del bien:" },
    { type: "number", name: "peso", message: "Nuevo peso del bien:" },
    { type: "number", name: "valor", message: "Nuevo valor del bien en coronas:" }
  ]);
  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    let bienes: any[] = JSON.parse(data);

    // Buscar el índice del bien a eliminar
    const indice = bienes.findIndex(bien => bien._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el bien con el ID proporcionado.");
      return;
    }

    // Eliminar el bien del arreglo
    bienes.splice(indice, 1);

    // borralo de la clase inventario
    inventario.eliminarBien(respuestas.id.trim());

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Bien.json", JSON.stringify(bienes, null, 2), "utf-8");
    console.log("Bien eliminado con éxito.");

    // Crear un nuevo bien con los datos proporcionados
    const nuevoBien = new Bien(
      respuestas.id,
      respuestas.nombre,
      respuestas.descripcion,
      respuestas.material,
      respuestas.peso,
      respuestas.valor
    );

    // Agregar el nuevo bien al inventario
    nuevoBien.guardarDatos();
    inventario.agregarBien(nuevoBien);
    console.log("Bien modificado con éxito.");
  } catch (error) {
    console.error("Error al modificar el bien:", error.message);
  }
}

/**
 * Función para modificar un mercader
 */
export async function modificarMercader() {
  // Solicita los datos del mercader a modificar
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del mercader:" },
    { type: "input", name: "tipo", message: "Nuevo tipo de mercader:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del mercader:" }
  ]);

  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    let mercaderes: any[] = JSON.parse(data);

    // Buscar el índice del bien a eliminar
    const indice = mercaderes.findIndex(mercader => mercader._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el mercader con el ID proporcionado.");
      return;
    }

    // Eliminar el bien del arreglo
    mercaderes.splice(indice, 1);

    // borralo de la clase inventario
    inventario.eliminarBien(respuestas.id.trim());

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Mercader.json", JSON.stringify(mercaderes, null, 2), "utf-8");
    console.log("Mercader eliminado con éxito.");

    // Crear un nuevo bien con los datos proporcionados
    const nuevoMercader = new Mercader(
      respuestas.id,
      respuestas.nombre,
      respuestas.tipo,
      respuestas.ubicacion
    );
    nuevoMercader.guardarDatos();
    inventario.agregarMercader(nuevoMercader);
    console.log("Mercader modificado con éxito.");
  } catch (error) {
    console.error("Error al modificar el mercader:", error.message);
  }
}

/**
 * Función para modificar un cliente
 */
export async function modificarCliente() {
  // Solicita los datos del cliente a modificar
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del cliente:" },
    { type: "input", name: "raza", message: "Nueva raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del cliente:" }
  ]);

  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    let clientes: any[] = JSON.parse(data);

    // Buscar el índice del bien a eliminar
    const indice = clientes.findIndex(cliente => cliente._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el cliente con el ID proporcionado.");
      return;
    }

    // Eliminar el bien del arreglo
    clientes.splice(indice, 1);

    // borralo de la clase inventario
    inventario.eliminarCliente(respuestas.id.trim());

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Cliente.json", JSON.stringify(clientes, null, 2), "utf-8");
    console.log("Cliente eliminado con éxito.");

    // Crear un nuevo bien con los datos proporcionados
    const nuevoCliente = new Cliente(
      respuestas.id,
      respuestas.nombre,
      respuestas.raza,
      respuestas.ubicacion
    );
    nuevoCliente.guardarDatos();
    inventario.agregarCliente(nuevoCliente);
    console.log("Cliente modificado con éxito.");
  } catch (error) {
    console.error("Error al modificar el cliente:", error.message);
  }
}

/**
 * Función para buscar un elemento según un tipo y un valor, solicitando al usuario el valor a buscar.
 */
export async function buscar(tipo: string, valor: string) {
  // Preguntar al usuario el valor a buscar según el tipo
  const respuestas = await inquirer.prompt([
    {
      type: "input",
      name: "buscar",
      message: `Introduce el valor a buscar para el tipo "${tipo}":`
    }
  ]);

  const buscar = respuestas.buscar.trim();

  try {
    // cargar todo desde el archivo JSON
    await cargarTodoDesdeJSON();
    // Guardar en una variable lo que devuelve el inventario al buscar
    const resultado = inventario.buscar(tipo, valor, buscar);

    if (resultado) {
      console.log(`Resultados encontrados para el tipo "${tipo}" con el valor "${valor}":`);
      console.log(resultado);
    } else {
      console.log(`No se encontró ningún ${tipo} con el valor "${valor}"., Y el valor a buscar es: ${buscar}`);
    }
  } catch (error) {
    console.error(`Error al buscar el ${tipo}:`, error.message);
  }
}

/**
 * Funcion para cargar los bienes desde un archivo JSON, y los agrege como clases al inventario
 */
export async function cargarBienesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes = JSON.parse(data);

    // Agregar los bienes al inventario
    bienes.forEach((bien: any) => {
      inventario.agregarBien(
        new Bien(
          bien._idUnico,
          bien._nombre,
          bien._descripcion,
          bien._material,
          bien._peso,
          bien._valorCoronas
        )
      );
    });

    console.log("Bienes cargados desde el archivo JSON.");
  } catch (error) {
    console.error("Error al cargar los bienes desde el archivo JSON:", error.message);
  }
}

// fucnion para cargar los clientes desde un archivo JSON, y los agrege como clases al inventario
export async function cargarClientesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    const clientes = JSON.parse(data);

    // Limpiar los clientes existentes en el inventario antes de cargar nuevos
    inventario.limpiarClientes();

    // Agregar los clientes al inventario
    clientes.forEach((cliente: any) => {
      inventario.agregarCliente(
        new Cliente(cliente._idUnico, cliente._nombre, cliente._raza, cliente._ubicacion)
      );
    });

    console.log("Clientes cargados desde el archivo JSON.");
  } catch (error) {
    console.error("Error al cargar los clientes desde el archivo JSON:", error.message);
  }
}

/**
 * Funcion para cargar los mercaderes desde un archivo JSON, y los agrege como clases al inventario
 */
export async function cargarMercaderesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    const mercaderes = JSON.parse(data);

    // Limpiar los mercaderes existentes en el inventario antes de cargar nuevos
    inventario.limpiarMercaderes();

    // Agregar los mercaderes al inventario
    mercaderes.forEach((mercader: any) => {
      inventario.agregarMercader(
        new Mercader(mercader._id, mercader._nombre, mercader._tipo, mercader._ubicacion)
      );
    });

    console.log("Mercaderes cargados desde el archivo JSON.");
  } catch (error) {
    console.error("Error al cargar los mercaderes desde el archivo JSON:", error.message);
  }
}


// fucnion para cargar todo desde un archivo JSON, y los agrege como clases al inventario, y debe llamar a las funciones de cargarBienesDesdeJSON, cargarClientesDesdeJSON y cargarMercaderesDesdeJSON
export async function cargarTodoDesdeJSON() {
  try {
    // elimina todo de inventario
    inventario.limpiarBienes();
    inventario.limpiarClientes();
    inventario.limpiarMercaderes();
    await cargarBienesDesdeJSON();
    await cargarClientesDesdeJSON();
    await cargarMercaderesDesdeJSON();
    console.log("Todo cargado desde el archivo JSON.");
  } catch (error) {
    console.error("Error al cargar todo desde el archivo JSON:", error.message);
  }
}


// funcion para ordenar los bienes por nombre
export async function ordenarBienesPorNombre(opt: boolean) {

}

// Funciones para generar informes
export async function estadoStock() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "tipo",
      message: "¿Cómo deseas consultar el stock?",
      choices: [
        "Por nombre del bien",
        "Por material del bien",
        "Volver al menú de informes"
      ]
    }
  ]);

  if (respuesta.tipo === "Por nombre del bien") {
    const respuestas = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nombre del bien:" }
    ]);
    const stock = inventario.obtenerStockPorNombre(respuestas.nombre);
    console.log(`Stock del bien "${respuestas.nombre}": ${stock}`);
  } else if (respuesta.tipo === "Por material del bien") {
    const respuestas = await inquirer.prompt([
      { type: "input", name: "material", message: "Material del bien:" }
    ]);
    const stock = inventario.obtenerStockPorMaterial(respuestas.material);
    console.log(`Stock de bienes con material "${respuestas.material}": ${stock}`);
  }
}

export async function bienesMasVendidos() {
  const bienesVendidos = inventario.gestorTransaccioness.obtenerBienesMasVendidos();
  console.log("Bienes más vendidos:");
  bienesVendidos.forEach((bien, index) => {
    console.log(`${index + 1}. ${bien.nombre}: ${bien.cantidad} ventas`);
  });
}

export async function totalIngresosGastos() {
  const ingresos = inventario.gestorTransaccioness.obtenerTotalIngresos();
  const gastos = inventario.gestorTransaccioness.obtenerTotalGastos();
  console.log(`Total de ingresos por ventas: ${ingresos} coronas`);
  console.log(`Total de gastos por compras: ${gastos} coronas`);
  console.log(`Balance total: ${ingresos - gastos} coronas`);
}

export async function historialTransacciones() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "tipo",
      message: "¿De quién deseas obtener el historial?",
      choices: [
        "Cliente",
        "Mercader",
        "Volver al menú de informes"
      ]
    }
  ]);

  if (respuesta.tipo === "Cliente" || respuesta.tipo === "Mercader") {
    const respuestas = await inquirer.prompt([
      { type: "input", name: "id", message: `ID del ${respuesta.tipo.toLowerCase()}:` }
    ]);
    const historial = inventario.gestorTransaccioness.obtenerHistorialPorActor(respuestas.id, respuesta.tipo.toLowerCase());
    console.log(`Historial de transacciones:`);
    historial.forEach((transaccion, index) => {
      console.log(`${index + 1}. Tipo: ${transaccion.tipo}, Fecha: ${transaccion.fecha}, Bienes: ${transaccion.bienes.join(", ")}, Coronas: ${transaccion.cantidadCoronas}`);
    });
  }
}
