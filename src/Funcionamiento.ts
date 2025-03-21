import inquirer from "inquirer";
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

// Funciones para agregar
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

// Funciones para eliminar
async function eliminarBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien a eliminar:" }
  ]);

  if (inventario.eliminarBien(respuestas.id)) {
    console.log("Bien eliminado con éxito.");
  } else {
    console.log("No se encontró el bien con el ID proporcionado.");
  }
}

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

// Funciones para modificar
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

// Funciones para buscar
async function buscarBienPorNombre() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien a buscar:" }
  ]);

  const bien = inventario.buscarBien(respuestas.nombre);
  if (bien) {
    console.log("Bien encontrado:", bien);
  } else {
    console.log("No se encontró el bien con el nombre proporcionado.");
  }
}

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

menuPrincipal();