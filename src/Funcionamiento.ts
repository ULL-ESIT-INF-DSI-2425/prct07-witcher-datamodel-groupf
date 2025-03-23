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

    // Agregar el nuevo bien al inventario en memoria
    inventario.agregarBien(nuevoBien);

    console.log("Bien agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el bien:", error.message);
  }
}


export async function consultarBienes() {
  const bienes = inventario.listarBienes();
}

export async function consultarMercaderes() {
  const mercaderes = inventario.listarMercaderes();
}

export async function consultarClientes() {
  const clientes = inventario.listarClientes();
}

/**
 * Funcion para agregar un mercader
 */
export async function agregarMercader() {
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
export async function agregarCliente() {
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

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Cliente.json", JSON.stringify(clientes, null, 2), "utf-8");
    console.log("Cliente eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el cliente:", error.message);
  }
}

/**
 * Funcion para modificar un bien
 */
export async function modificarBien() {
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

    // Buscar el índice del bien a modificar
    const indice = bienes.findIndex(bien => bien._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el bien con el ID proporcionado.");
      return;
    }

    // Eliminar el bien existente
    bienes.splice(indice, 1);

    // Crear el nuevo bien con los datos proporcionados
    const nuevoBien = {
      _idUnico: respuestas.id.trim(),
      _nombre: respuestas.nombre,
      _descripcion: respuestas.descripcion,
      _material: respuestas.material,
      _peso: respuestas.peso,
      _valorCoronas: respuestas.valor
    };

    // Agregar el nuevo bien al arreglo
    bienes.push(nuevoBien);

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Bien.json", JSON.stringify(bienes, null, 2), "utf-8");
    console.log("Bien modificado con éxito.");
  } catch (error) {
    console.error("Error al modificar el bien:", error.message);
  }
}


/**
 * Funcion para modificar un mercader
 */
export async function modificarMercader() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del mercader:" },
    { type: "input", name: "tipo", message: "Nuevo tipo de mercader:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del mercader:" }
  ]);

  try {
    // Leer el archivo JSON de mercaderes
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    let mercaderes: any[] = JSON.parse(data);

    // Buscar el índice del mercader a modificar
    const indice = mercaderes.findIndex(mercader => mercader._id === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el mercader con el ID proporcionado.");
      return;
    }

    // Eliminar el mercader existente
    mercaderes.splice(indice, 1);

    // Crear el nuevo mercader con los datos proporcionados
    const nuevoMercader = {
      _id: respuestas.id.trim(),
      _nombre: respuestas.nombre,
      _tipo: respuestas.tipo,
      _ubicacion: respuestas.ubicacion
    };

    // Agregar el nuevo mercader al arreglo
    mercaderes.push(nuevoMercader);

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Mercader.json", JSON.stringify(mercaderes, null, 2), "utf-8");
    console.log("Mercader modificado con éxito.");
  } catch (error) {
    console.error("Error al modificar el mercader:", error.message);
  }
}


/**
 * Funcion para modificar un cliente
 */
export async function modificarCliente() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del cliente:" },
    { type: "input", name: "raza", message: "Nueva raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del cliente:" }
  ]);

  try {
    // Leer el archivo JSON de clientes
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    let clientes: any[] = JSON.parse(data);

    // Buscar el índice del cliente a modificar
    const indice = clientes.findIndex(cliente => cliente._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el cliente con el ID proporcionado.");
      return;
    }

    // Eliminar el cliente existente
    clientes.splice(indice, 1);

    // Crear el nuevo cliente con los datos proporcionados
    const nuevoCliente = {
      _idUnico: respuestas.id.trim(),
      _nombre: respuestas.nombre,
      _raza: respuestas.raza,
      _ubicacion: respuestas.ubicacion
    };

    // Agregar el nuevo cliente al arreglo
    clientes.push(nuevoCliente);

    // Guardar los cambios en el archivo JSON
    await fs.writeFile("./db/Cliente.json", JSON.stringify(clientes, null, 2), "utf-8");
    console.log("Cliente modificado con éxito.");
  } catch (error) {
    console.error("Error al modificar el cliente:", error.message);
  }
}

/**
 * Funcion para buscar un bien por nombre
 */
export async function buscarBienPorNombre() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes: any[] = JSON.parse(data);

    // Buscar los bienes directamente en los datos leídos del archivo, ignorando mayúsculas y minúsculas, y que sea estricto igual
    const bienesEncontrados = bienes.filter(bien =>
      bien._nombre && bien._nombre.toLowerCase() === respuestas.nombre.toLowerCase()
    );

    if (bienesEncontrados.length > 0) {
      console.log(`Se encontraron ${bienesEncontrados.length} bien(es) con el nombre "${respuestas.nombre}":`);
      bienesEncontrados.forEach((bien, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${bien._idUnico}`);
        console.log(`   Nombre: ${bien._nombre}`);
        console.log(`   Descripción: ${bien._descripcion}`);
        console.log(`   Material: ${bien._material}`);
        console.log(`   Peso: ${bien._peso} kg`);
        console.log(`   Valor: ${bien._valorCoronas} coronas`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún bien con el nombre "${respuestas.nombre}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}

/**
 * Funcion para buscar un mercader por nombre
 */
export async function buscarMercaderPorNombre() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del mercader a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de mercaderes
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    const mercaderes: any[] = JSON.parse(data);

    // Buscar los mercaderes directamente en los datos leídos del archivo y que sea estricto igual
    const mercaderesEncontrados = mercaderes.filter(mercader =>
      mercader._nombre && mercader._nombre.toLowerCase() === respuestas.nombre.toLowerCase()
    );
    

    if (mercaderesEncontrados.length > 0) {
      console.log(`Se encontraron ${mercaderesEncontrados.length} mercader(es) con el nombre "${respuestas.nombre}":`);
      mercaderesEncontrados.forEach((mercader, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${mercader._id}`);
        console.log(`   Nombre: ${mercader._nombre}`);
        console.log(`   Ubicación: ${mercader._ubicacion}`);
        console.log(`   Tipo: ${mercader._tipo}`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún mercader con el nombre "${respuestas.nombre}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}

/**
 * Funcion para buscar un cliente por nombre
 */
export async function buscarClientePorNombre() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del cliente a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de clientes
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    const clientes: any[] = JSON.parse(data);

    // Buscar los clientes directamente en los datos leídos del archivo
    const clientesEncontrados = clientes.filter(cliente =>
      cliente._nombre && cliente._nombre.toLowerCase() === respuestas.nombre.toLowerCase()
    );

    if (clientesEncontrados.length > 0) {
      console.log(`Se encontraron ${clientesEncontrados.length} cliente(s) con el nombre "${respuestas.nombre}":`);
      clientesEncontrados.forEach((cliente, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${cliente._idUnico}`);
        console.log(`   Nombre: ${cliente._nombre}`);
        console.log(`   Raza: ${cliente._raza}`);
        console.log(`   Ubicación: ${cliente._ubicacion}`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún cliente con el nombre "${respuestas.nombre}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}

/**
 * Funcion para buscar un bien por descripcion
 */
export async function buscarBienPorDescripcion() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "descripcion", message: "Descripcion del bien a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes: any[] = JSON.parse(data);

    // Buscar los bienes directamente en los datos leídos del archivo
    const bienesEncontrados = bienes.filter(bien =>
      bien._descripcion&& bien._descripcion.toLowerCase() === respuestas.descripcion.toLowerCase()
    );


    if (bienesEncontrados.length > 0) {
      console.log(`Se encontraron ${bienesEncontrados.length} bien(es) con la denombrescripcion "${respuestas.descripcion}":`);
      bienesEncontrados.forEach((bien, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${bien._idUnico}`);
        console.log(`   Nombre: ${bien._nombre}`);
        console.log(`   Descripción: ${bien._descripcion}`);
        console.log(`   Material: ${bien._material}`);
        console.log(`   Peso: ${bien._peso} kg`);
        console.log(`   Valor: ${bien._valorCoronas} coronas`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún bien con la descripcion "${respuestas.descripcion}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}

/**
 * Funcion para buscar un bien por material
 */
export async function buscarBienPorMaterial() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "material", message: "Material del bien a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de bienes
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes: any[] = JSON.parse(data);

    // Buscar los bienes directamente en los datos leídos del archivo y que contenga el material y que sea estricto igual
    const bienesEncontrados = bienes.filter(bien =>
      bien._material && bien._material.toLowerCase() === respuestas.material.toLowerCase()
    );

    if (bienesEncontrados.length > 0) {
      console.log(`Se encontraron ${bienesEncontrados.length} bien(es) con el material "${respuestas.material}":`);
      bienesEncontrados.forEach((bien, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${bien._idUnico}`);
        console.log(`   Nombre: ${bien._nombre}`);
        console.log(`   Descripción: ${bien._descripcion}`);
        console.log(`   Material: ${bien._material}`);
        console.log(`   Peso: ${bien._peso} kg`);
        console.log(`   Valor: ${bien._valorCoronas} coronas`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún bien con el material "${respuestas.material}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}


/**
 * Funcion para buscar un mercader por tipo
 */
export async function buscarMercaderPorTipo() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "tipo", message: "Tipo del mercader a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de mercaderes
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    const mercaderes: any[] = JSON.parse(data);

    // Buscar los mercaderes directamente en los datos leídos del archivo y que contenga el tipo y que sea estricto igual
    const mercaderesEncontrados = mercaderes.filter(mercader =>
      mercader._tipo && mercader._tipo.toLowerCase() === respuestas.tipo.toLowerCase()
    );
    
    if (mercaderesEncontrados.length > 0) {
      console.log(`Se encontraron ${mercaderesEncontrados.length} mercader(es) con el tipo "${respuestas.tipo}":`);
      mercaderesEncontrados.forEach((mercader, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${mercader._id}`);
        console.log(`   Nombre: ${mercader._nombre}`);
        console.log(`   Ubicación: ${mercader._ubicacion}`);
        console.log(`   Tipo: ${mercader._tipo}`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún mercader con el tipo "${respuestas.tipo}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}

/**
 * Funcion para buscar un mercader por ubicacion
 */
export async function buscarMercaderPorUbicacion() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "ubicacion", message: "Ubicacion del mercader a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de mercaderes
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    const mercaderes: any[] = JSON.parse(data);

    // Buscar los mercaderes directamente en los datos leídos del archivo y que contenga la ubicacion y que sea estricto igual
    const mercaderesEncontrados = mercaderes.filter(mercader =>
      mercader._ubicacion && mercader._ubicacion.toLowerCase() === respuestas.ubicacion.toLowerCase()
    );

    if (mercaderesEncontrados.length > 0) {
      console.log(`Se encontraron ${mercaderesEncontrados.length} mercader(es) con la ubicacion "${respuestas.ubicacion}":`);
      mercaderesEncontrados.forEach((mercader, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${mercader._id}`);
        console.log(`   Nombre: ${mercader._nombre}`);
        console.log(`   Ubicación: ${mercader._ubicacion}`);
        console.log(`   Tipo: ${mercader._tipo}`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún mercader con la ubicacion "${respuestas.ubicacion}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}

/**
 * Funcion para buscar un cliente por nombre
 */
export async function buscarClientePorRaza() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "raza", message: "Raza del cliente a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de clientes
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    const clientes: any[] = JSON.parse(data);

    // Buscar los clientes directamente en los datos leídos del archivo y que contenga la raza y que sea estricto igual
    const clientesEncontrados = clientes.filter(cliente =>
      cliente._raza && cliente._raza.toLowerCase() === respuestas.raza.toLowerCase()
    );
    
    if (clientesEncontrados.length > 0) {
      console.log(`Se encontraron ${clientesEncontrados.length} cliente(s) con la raza "${respuestas.raza}":`);
      clientesEncontrados.forEach((cliente, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${cliente._idUnico}`);
        console.log(`   Nombre: ${cliente._nombre}`);
        console.log(`   Raza: ${cliente._raza}`);
        console.log(`   Ubicación: ${cliente._ubicacion}`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún cliente con la raza "${respuestas.raza}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}

/**
 * Funcion para buscar un cliente por nombre
 */
export async function buscarClientePorUbicacion() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "ubicacion", message: "Ubicacion del cliente a buscar:" }
  ]);

  try {
    // Leer el archivo JSON de clientes
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    const clientes: any[] = JSON.parse(data);

    // Buscar los clientes directamente en los datos leídos del archivo y que contenga la ubicacion y que sea estricto igual
    const clientesEncontrados = clientes.filter(cliente =>
      cliente._ubicacion && cliente._ubicacion.toLowerCase() === respuestas.ubicacion.toLowerCase()
    );
    
    if (clientesEncontrados.length > 0) {
      console.log(`Se encontraron ${clientesEncontrados.length} cliente(s) con la ubicacion "${respuestas.ubicacion}":`);
      clientesEncontrados.forEach((cliente, index) => {
        console.log(`${index + 1}.`);
        console.log(`   ID: ${cliente._idUnico}`);
        console.log(`   Nombre: ${cliente._nombre}`);
        console.log(`   Raza: ${cliente._raza}`);
        console.log(`   Ubicación: ${cliente._ubicacion}`);
        console.log("-----------------------------------");
      });
    } else {
      console.log(`No se encontró ningún cliente con la ubicacion "${respuestas.ubicacion}".`);
    }
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
  }
}


/**
 * Funcion para cargar los bienes desde un archivo JSON, y los agrege como clases al inventario
 */
export async function cargarBienesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes = JSON.parse(data);

    // Agregar los bienes al inventario solo si no están duplicados
    bienes.forEach((bien: any) => {
      const existe = inventario.listarBienes().some(b => b.idUnico === bien._idUnico);
      if (!existe) {
        inventario.agregarBien(
          new Bien(bien._idUnico, bien._nombre, bien._descripcion, bien._material, bien._peso, bien._valorCoronas)
        );
      }
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
  inventario.ordenarBienesPorNombre(opt);
  console.log("Bienes ordenados por nombre.");
  // Mostrar los bienes ordenados
  let bienes = inventario.listarBienes();
  if (bienes.length > 0) { 
    console.log(`Se encontraron ${bienes.length} bienes:`);
    bienes.forEach((bien, index) => {
      console.log(`${index + 1}.`);
      console.log(`   ID: ${bien.idUnico}`);
      console.log(`   Nombre: ${bien.nombre}`);
      console.log(`   Descripción: ${bien.descripcion}`);
      console.log(`   Material: ${bien.material}`);
      console.log(`   Peso: ${bien.peso} kg`);
      console.log(`   Valor: ${bien.valorCoronas} coronas`);
      console.log("-----------------------------------");
    });
  } else {
    console.log(`No se encontró ningún bien.`);
  }
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
