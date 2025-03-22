import inquirer from "inquirer";
import fs from "fs/promises";
import { Inventario } from "./Inventario.js";
import { Bien } from "./bienes.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercaderes.js";

const inventario = new Inventario();

// Menú principal
async function menuPrincipal() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué acción deseas realizar?",
      choices: [
        "Añadir",
        "Eliminar",
        "Modificar",
        "Consultar",
        "Buscar",
        "Ordenar",
        "Informes", 
        "Salir"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Añadir":
      await menuAñadir();
      break;
    case "Eliminar":
      await menuEliminar();
      break;
    case "Modificar":
      await menuModificar();
      break;
    case "Consultar":
      await menuConsultar();
      break;
    case "Buscar":
      await menuBuscar();
      break;
    case "Ordenar":
      await menuOrdenar();
      break;
    case "Informes": 
      await menuInformes();
      break;
    case "Salir":
      console.log("¡Hasta luego!");
      return;
  }

  await menuPrincipal();
}

// Submenú para Añadir
async function menuAñadir() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué deseas añadir?",
      choices: [
        "Añadir un bien",
        "Añadir un mercader",
        "Añadir un cliente",
        "Volver al menú principal"
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
    case "Volver al menú principal":
      return;
  }

  await menuAñadir();
}

// Submenú para Eliminar
async function menuEliminar() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué deseas eliminar?",
      choices: [
        "Eliminar un bien",
        "Eliminar un mercader",
        "Eliminar un cliente",
        "Volver al menú principal"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Eliminar un bien":
      await eliminarBien();
      break;
    case "Eliminar un mercader":
      await eliminarMercader();
      break;
    case "Eliminar un cliente":
      await eliminarCliente();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuEliminar();
}

// Submenú para Modificar
async function menuModificar() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué deseas modificar?",
      choices: [
        "Modificar un bien",
        "Modificar un mercader",
        "Modificar un cliente",
        "Volver al menú principal"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Modificar un bien":
      await modificarBien();
      break;
    case "Modificar un mercader":
      await modificarMercader();
      break;
    case "Modificar un cliente":
      await modificarCliente();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuModificar();
}

// Submenú para Consultar
async function menuConsultar() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué deseas consultar?",
      choices: [
        "Consultar bienes",
        "Consultar mercaderes",
        "Consultar clientes",
        "Volver al menú principal"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Consultar bienes":
      console.log(inventario.listarBienes());
      break;
    case "Consultar mercaderes":
      console.log(inventario.listarMercaderes());
      break;
    case "Consultar clientes":
      console.log(inventario.listarClientes());
      break;
    case "Volver al menú principal":
      return;
  }

  await menuConsultar();
}

// Submenú para Buscar
async function menuBuscar() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué deseas buscar?",
      choices: [
        "Buscar bien por nombre",
        "Buscar mercader por nombre",
        "Buscar cliente por nombre",
        "Volver al menú principal"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Buscar bien por nombre":
      await buscarBienPorNombre();
      break;
    case "Buscar mercader por nombre":
      await buscarMercaderPorNombre();
      break;
    case "Buscar cliente por nombre":
      await buscarClientePorNombre();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuBuscar();
}

// Submenú para Ordenar
async function menuOrdenar() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué deseas ordenar?",
      choices: [
        "Ordenar bienes por nombre",
        "Ordenar bienes por valor",
        "Volver al menú principal"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Ordenar bienes por nombre":
      const ordenNombre = await inquirer.prompt([
        { type: "confirm", name: "ascendente", message: "¿Orden ascendente?" }
      ]);
      console.log(inventario.ordenarBienesPorNombre(ordenNombre.ascendente));
      break;
    case "Ordenar bienes por valor":
      const ordenValor = await inquirer.prompt([
        { type: "confirm", name: "ascendente", message: "¿Orden ascendente?" }
      ]);
      console.log(inventario.ordenarBienesPorValor(ordenValor.ascendente));
      break;
    case "Volver al menú principal":
      return;
  }

  await menuOrdenar();
}

// Submenú para Informes
async function menuInformes() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué informe deseas generar?",
      choices: [
        "Estado del stock de un bien",
        "Bienes más vendidos",
        "Total de ingresos y gastos",
        "Historial de transacciones de un cliente o mercader",
        "Volver al menú principal"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Estado del stock de un bien":
      await estadoStock();
      break;
    case "Bienes más vendidos":
      await bienesMasVendidos();
      break;
    case "Total de ingresos y gastos":
      await totalIngresosGastos();
      break;
    case "Historial de transacciones de un cliente o mercader":
      await historialTransacciones();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuInformes();
}

/**
 * Funcion para agregar un bien
 */
async function agregarBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien:" },
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien:" },
    { type: "number", name: "valor", message: "Valor del bien en coronas:" }
  ]);

  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes: any[] = JSON.parse(data);

    // Verificar si el ID ya existe
    const existe = bienes.some(bien => bien._idUnico === respuestas.id.trim());
    if (existe) {
      console.log("Ya existe un bien con el mismo ID. No se puede agregar.");
      return;
    }

    // Crear el nuevo bien
    const nuevoBien = new Bien(
      respuestas.id.trim(),
      respuestas.nombre,
      respuestas.descripcion,
      respuestas.material,
      respuestas.peso,
      respuestas.valor
    );

    // Agregar el nuevo bien al arreglo
    bienes.push(nuevoBien);

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Bien.json", JSON.stringify(bienes, null, 2), "utf-8");
    console.log("Bien agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el bien:", error.message);
  }
}

/**
 * Funcion para agregar un mercader
 */
async function agregarMercader() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader:" },
    { type: "input", name: "nombre", message: "Nombre del mercader:" },
    { type: "input", name: "tipo", message: "Tipo de mercader:" },
    { type: "input", name: "ubicacion", message: "Ubicación:" }
  ]);

  try {
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    const mercaderes: any[] = JSON.parse(data);

    const existe = mercaderes.some(mercader => mercader._id === respuestas.id);
    if (existe) {
      console.log("Ya existe un mercader con el mismo ID. No se puede agregar.");
      return;
    }

    const nuevoMercader = new Mercader(
      respuestas.id,
      respuestas.nombre,
      respuestas.tipo,
      respuestas.ubicacion
    );

    mercaderes.push(nuevoMercader);
    await fs.writeFile("./db/Mercader.json", JSON.stringify(mercaderes, null, 2), "utf-8");
    console.log("Mercader agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el mercader:", error.message);
  }
}

/**
 * Funcion para agregar un cliente
 */
async function agregarCliente() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente:" },
    { type: "input", name: "nombre", message: "Nombre del cliente:" },
    { type: "input", name: "raza", message: "Raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Ubicación:" }
  ]);

  try {
    // Leer el archivo JSON de clientes
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    const clientes: any[] = JSON.parse(data);

    // Verificar si el ID ya existe
    const existe = clientes.some(cliente => cliente._idUnico === respuestas.id.trim());
    if (existe) {
      console.log("Ya existe un cliente con el mismo ID. No se puede agregar.");
      return;
    }

    // Crear el nuevo cliente
    const nuevoCliente = new Cliente(
      respuestas.id.trim(),
      respuestas.nombre,
      respuestas.raza,
      respuestas.ubicacion
    );

    // Agregar el nuevo cliente al arreglo
    clientes.push(nuevoCliente);

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Cliente.json", JSON.stringify(clientes, null, 2), "utf-8");
    console.log("Cliente agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el cliente:", error.message);
  }
}

/**
 * Funcion para eliminar un bien
 */
async function eliminarBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien a eliminar:" }
  ]);

  if (inventario.eliminarBien(respuestas.id)) {
    console.log("Bien eliminado con éxito.");
    await fs.writeFile("./db/Bien.json", JSON.stringify(inventario.listarBienes(), null, 2), "utf-8");
  } else {
    console.log("No se encontró el bien con el ID proporcionado.");
  }
}

/**
 * Funcion para eliminar un mercader
 */
async function eliminarMercader() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a eliminar:" }
  ]);

  if (inventario.eliminarMercader(respuestas.id)) {
    console.log("Mercader eliminado con éxito.");
  } else {
    console.log("No se encontró el mercader con el ID proporcionado.");
  }
}

/**
 * Funcion para eliminar un cliente
 */
async function eliminarCliente() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a eliminar:" }
  ]);

  if (inventario.eliminarCliente(respuestas.id)) {
    console.log("Cliente eliminado con éxito.");
  } else {
    console.log("No se encontró el cliente con el ID proporcionado.");
  }
}

/**
 * Funcion para modificar un bien
 */
async function modificarBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del bien:" },
    { type: "input", name: "descripcion", message: "Nueva descripción del bien:" },
    { type: "input", name: "material", message: "Nuevo material del bien:" },
    { type: "number", name: "peso", message: "Nuevo peso del bien:" },
    { type: "number", name: "valor", message: "Nuevo valor del bien en coronas:" }
  ]);

  if (inventario.modificarBien(respuestas.id, {
    nombre: respuestas.nombre,
    descripcion: respuestas.descripcion,
    material: respuestas.material,
    peso: respuestas.peso,
    valorCoronas: respuestas.valor
  })) {
    console.log("Bien modificado con éxito.");
  } else {
    console.log("No se encontró el bien con el ID proporcionado.");
  }
}

/**
 * Funcion para modificar un mercader
 */
async function modificarMercader() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del mercader:" },
    { type: "input", name: "tipo", message: "Nuevo tipo de mercader:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del mercader:" }
  ]);

  if (inventario.modificarMercader(respuestas.id, {
    nombre: respuestas.nombre,
    tipo: respuestas.tipo,
    ubicacion: respuestas.ubicacion
  })) {
    console.log("Mercader modificado con éxito.");
  } else {
    console.log("No se encontró el mercader con el ID proporcionado.");
  }
}

/**
 * Función para registrar una venta
 */
async function registrarVenta() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "clienteId", message: "ID del cliente:" },
    { type: "input", name: "bienes", message: "Bienes vendidos (separados por comas):" },
    { type: "number", name: "cantidadCoronas", message: "Cantidad de coronas involucrada:" },
    { type: "input", name: "detalles", message: "Detalles adicionales:" }
  ]);

  const bienes = respuestas.bienes.split(",").map((bien: string) => bien.trim());
  const exito = inventario.registrarVenta(respuestas.clienteId, bienes, respuestas.cantidadCoronas, respuestas.detalles);
  if (exito) {
    console.log("Venta registrada con éxito.");
  } else {
    console.log("No se pudo registrar la venta. Verifica los datos ingresados.");
  }
}

/**
 * Funcion para modificar un cliente
 */
async function modificarCliente() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del cliente:" },
    { type: "input", name: "raza", message: "Nueva raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del cliente:" }
  ]);

  if (inventario.modificarCliente(respuestas.id, {
    nombre: respuestas.nombre,
    raza: respuestas.raza,
    ubicacion: respuestas.ubicacion
  })) {
    console.log("Cliente modificado con éxito.");
  } else {
    console.log("No se encontró el cliente con el ID proporcionado.");
  }
}

/**
 * Funcion para buscar un bien por nombre
 */
async function buscarBienPorNombre() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien a buscar:" }
  ]);

  try {
    // Leer el archivo JSON
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes: Bien[] = JSON.parse(data);

    // Buscar el bien por nombre con validación
    const bien = bienes.find(bien => bien.nombre && bien.nombre.toLowerCase() === respuestas.nombre.toLowerCase());

    if (bien) {
      console.log("Bien encontrado:", bien);
    } else {
      console.log("No se encontró el bien con el nombre proporcionado.");
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}


/**
 * Funcion para buscar un mercader por nombre
 */
async function buscarMercaderPorNombre() {
 

  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del mercader a buscar:" }
  ]);

  const mercader = inventario.buscarMercader(respuestas.nombre);
  if (mercader) {
    console.log("Mercader encontrado:", mercader);
  } else {
    console.log("No se encontró el mercader con el nombre proporcionado.");
  }
}

/**
 * Funcion para buscar un cliente por nombre
 */
async function buscarClientePorNombre() {
 
  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del cliente a buscar:" }
  ]);

  const cliente = inventario.buscarCliente(respuestas.nombre);
  if (cliente) {
    console.log("Cliente encontrado:", cliente);
  } else {
    console.log("No se encontró el cliente con el nombre proporcionado.");
  }
}

/**
 * Funcion para cargar los bienes desde un archivo JSON
 */
async function cargarBienesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes = JSON.parse(data);

    // Limpiar el inventario antes de cargar nuevos bienes
    inventario.limpiarBienes();

    // Agregar los bienes al inventario
    bienes.forEach((bien: any) => {
      inventario.agregarBien(bien);
    });

    console.log("Bienes cargados desde el archivo JSON:", inventario.listarBienes());
  } catch (error) {
    console.error("Error al cargar los bienes desde el archivo JSON:", error.message);
  }
}

/**
 * Funcion para cargar los mercaderes desde un archivo JSON
 */
async function cargarMercaderesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    const mercaderes = JSON.parse(data);
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

/**
 * Funcion para cargar los clientes desde un archivo JSON
 */
async function cargarClientesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    const clientes = JSON.parse(data);
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

// Funciones para generar informes
async function estadoStock() {
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

async function bienesMasVendidos() {
  const bienesVendidos = inventario.gestorTransaccioness.obtenerBienesMasVendidos();
  console.log("Bienes más vendidos:");
  bienesVendidos.forEach((bien, index) => {
    console.log(`${index + 1}. ${bien.nombre}: ${bien.cantidad} ventas`);
  });
}

async function totalIngresosGastos() {
  const ingresos = inventario.gestorTransaccioness.obtenerTotalIngresos();
  const gastos = inventario.gestorTransaccioness.obtenerTotalGastos();
  console.log(`Total de ingresos por ventas: ${ingresos} coronas`);
  console.log(`Total de gastos por compras: ${gastos} coronas`);
  console.log(`Balance total: ${ingresos - gastos} coronas`);
}

async function historialTransacciones() {
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




menuPrincipal();