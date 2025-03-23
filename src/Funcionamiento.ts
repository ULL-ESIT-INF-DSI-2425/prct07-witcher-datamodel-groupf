import inquirer from "inquirer";
import fs from "fs/promises";
import { Inventario } from "./Inventario.js";
import { Bien } from "./models/bienes.js";
import { Cliente } from "./models/cliente.js";
import { Mercader } from "./models/mercaderes.js";

export const inventario = new Inventario();

/**
 * Función para mostrar el menú principal.
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
    
    await cargarTodoDesdeJSON();

    
    const existe = inventario.buscarBienPorId(respuestas.id);
    if (existe) {
      console.log("Ya existe un bien con el mismo ID. No se puede agregar.");
      return;
    }
    
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
  
    await cargarTodoDesdeJSON();

    
    const existe = inventario.buscarMercaderPorId(respuestas.id.trim());
    if (existe) {
      console.log("Ya existe un mercader con el mismo ID. No se puede agregar.");
      return;
    }

    
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
    
    await cargarTodoDesdeJSON();

   
    const existe = inventario.buscarClientePorId(respuestas.id.trim());
    if (existe) {
      console.log("Ya existe un cliente con el mismo ID. No se puede agregar.");
      return;
    }

   
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
   
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    let bienes: any[] = JSON.parse(data);

   
    const indice = bienes.findIndex(bien => bien._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el bien con el ID proporcionado.");
      return;
    }

    
    bienes.splice(indice, 1);

    
    inventario.eliminarBien(respuestas.id.trim());

    
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
    
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    let mercaderes: any[] = JSON.parse(data);

   
    const indice = mercaderes.findIndex(mercader => mercader._id === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el mercader con el ID proporcionado.");
      return;
    }

    
    mercaderes.splice(indice, 1);

    
    inventario.eliminarMercader(respuestas.id.trim());

    
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
    
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    let clientes: any[] = JSON.parse(data);

    const indice = clientes.findIndex(cliente => cliente._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el cliente con el ID proporcionado.");
      return;
    }

   
    clientes.splice(indice, 1);

    
    inventario.eliminarCliente(respuestas.id.trim());

  
    await fs.writeFile("./db/Cliente.json", JSON.stringify(clientes, null, 2), "utf-8");
    console.log("Cliente eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el cliente:", error.message);
  }
}

export async function consultarBienes() {
 
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
 
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del bien:" },
    { type: "input", name: "descripcion", message: "Nueva descripción del bien:" },
    { type: "input", name: "material", message: "Nuevo material del bien:" },
    { type: "number", name: "peso", message: "Nuevo peso del bien:" },
    { type: "number", name: "valor", message: "Nuevo valor del bien en coronas:" }
  ]);
  try {
   
    const data = await fs.readFile("./db/Bien.json", "utf-8");
    let bienes: any[] = JSON.parse(data);

   
    const indice = bienes.findIndex(bien => bien._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el bien con el ID proporcionado.");
      return;
    }

   
    bienes.splice(indice, 1);

    
    inventario.eliminarBien(respuestas.id.trim());

 
    await fs.writeFile("./db/Bien.json", JSON.stringify(bienes, null, 2), "utf-8");
    console.log("Bien eliminado con éxito.");


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
    console.log("Bien modificado con éxito.");
  } catch (error) {
    console.error("Error al modificar el bien:", error.message);
  }
}

/**
 * Función para modificar un mercader
 */
export async function modificarMercader() {
 
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del mercader:" },
    { type: "input", name: "tipo", message: "Nuevo tipo de mercader:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del mercader:" }
  ]);

  try {
    
    const data = await fs.readFile("./db/Mercader.json", "utf-8");
    let mercaderes: any[] = JSON.parse(data);

    
    const indice = mercaderes.findIndex(mercader => mercader._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el mercader con el ID proporcionado.");
      return;
    }

   
    mercaderes.splice(indice, 1);

   
    inventario.eliminarBien(respuestas.id.trim());

   
    await fs.writeFile("./db/Mercader.json", JSON.stringify(mercaderes, null, 2), "utf-8");
    console.log("Mercader eliminado con éxito.");

   
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
 
  const respuestas = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a modificar:" },
    { type: "input", name: "nombre", message: "Nuevo nombre del cliente:" },
    { type: "input", name: "raza", message: "Nueva raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Nueva ubicación del cliente:" }
  ]);

  try {
   
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    let clientes: any[] = JSON.parse(data);

   
    const indice = clientes.findIndex(cliente => cliente._idUnico === respuestas.id.trim());

    if (indice === -1) {
      console.log("No se encontró el cliente con el ID proporcionado.");
      return;
    }

   
    clientes.splice(indice, 1);

   
    inventario.eliminarCliente(respuestas.id.trim());

    
    await fs.writeFile("./db/Cliente.json", JSON.stringify(clientes, null, 2), "utf-8");
    console.log("Cliente eliminado con éxito.");

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
 * Función para buscar un elemento según un tipo y un valor, solicitan do al usuario el valor a buscar.
 * @param tipo - Tipo de elemento a buscar.
 * @param valor - Valor a buscar.
 */
export async function buscar(tipo: string, valor: string) {
  const respuestas = await inquirer.prompt([
    {
      type: "input",
      name: "buscar",
      message: `Introduce el valor a buscar para el tipo "${tipo}":`
    }
  ]);

  const buscar = respuestas.buscar.trim();  
    console.log("Buscando en el tipo: ", tipo);
  try {
    await cargarTodoDesdeJSON();

    console.log("Valores", tipo, valor, buscar)
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
  } catch (error) {
    console.error("Error al cargar los bienes desde el archivo JSON:", error.message);
  }
}


export async function cargarClientesDesdeJSON() {
  try {
    const data = await fs.readFile("./db/Cliente.json", "utf-8");
    const clientes = JSON.parse(data);

    inventario.limpiarClientes();

    
    clientes.forEach((cliente: any) => {
      inventario.agregarCliente(
        new Cliente(cliente._idUnico, cliente._nombre, cliente._raza, cliente._ubicacion)
      );
    });
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

   
    inventario.limpiarMercaderes();

    
    mercaderes.forEach((mercader: any) => {
      inventario.agregarMercader(
        new Mercader(mercader._id, mercader._nombre, mercader._tipo, mercader._ubicacion)
      );
    });
  } catch (error) {
    console.error("Error al cargar los mercaderes desde el archivo JSON:", error.message);
  }
}

/**
 * Función para cargar todos los datos desde los archivos JSON.
 */
export async function cargarTodoDesdeJSON() {
  try {
    inventario.limpiarBienes();
    inventario.limpiarClientes();
    inventario.limpiarMercaderes();
    await cargarBienesDesdeJSON();
    await cargarClientesDesdeJSON();
    await cargarMercaderesDesdeJSON();
  } catch (error) {
    console.error("Error al cargar todo desde el archivo JSON:", error.message);
  }
}


/**
 * Funcion para ordenar los bienes por nombre
 * @param opt - Opción para ordenar de forma ascendente o descendente.
 */
export async function ordenarBienesPorNombre(opt: boolean) {
  await cargarTodoDesdeJSON();
  if (opt) {
    let bienes = inventario.ordenarBienesPorNombre(true);
    console.log(bienes);
  } else {
    let bienes = inventario.ordenarBienesPorNombre(false);
    console.log(bienes);
  }
}

/**
 * Funcion para ordenar los bienes por valor
 * @param opt - Opción para ordenar de forma ascendente o descendente.
 */
export async function ordenarBienesPorValor(opt: boolean) {
  await cargarTodoDesdeJSON();
  if (opt) {
    let bienes = inventario.ordenarBienesPorValor(true);
    console.log(bienes);
  } else {
    let bienes = inventario.ordenarBienesPorValor(false);
    console.log(bienes);
  }
}


/**
 * Función para mostrar el stock de un bien en concreto. 
 */
export async function stockDeUnBien() {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien a buscar:" }
  ]);
  try {
    await cargarTodoDesdeJSON();
    const resultado = inventario.obtenerStockPorNombre(respuestas.nombre);
    if (resultado) {
      console.log(`Stock del bien "${respuestas.nombre}":`);
      console.log(resultado);
    } else {
      console.log(`No se encontró el bien con el nombre "${respuestas.nombre}".`);
    }
  }
  catch (error) {
    console.error("Error al buscar el bien:", error.message);
  }
}

/**
 * Función para realizar una compra.
 * @param compradorId - ID del comprador (mercader).
 */
export async function realizarCompra() {
  try {
    console.log("Realizar compra");
    await cargarTodoDesdeJSON();
    const respuestas = await inquirer.prompt([
      { type: "input", name: "id", message: "ID del mercader:" }
    ]); 
    const mercader = inventario.buscarMercaderPorId(respuestas.id);
    if (!mercader) {
      console.log("Mercader no encontrado.");
      return;
    }    
    const respuestas2 = await inquirer.prompt([
      { type: "number", name: "cantidadCoronas", message: "Cantidad de coronas a pagar:" }
    ]);
    console.log("introduce el bien que quieres comprar");
  
    
    
  const respuestas3 = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del bien:" },
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien:" },
    { type: "number", name: "valor", message: "Valor del bien en coronas:" }
  ]);

  try {
    await cargarTodoDesdeJSON();

    const existe = inventario.buscarBienPorId(respuestas3.id);
    if (existe) {
      console.log("Ya existe un bien con el mismo ID. No se puede agregar.");
      return;
    }
  
    const nuevoBien = new Bien(
      respuestas3.id,
      respuestas3.nombre,
      respuestas3.descripcion,
      respuestas3.material,
      respuestas3.peso,
      respuestas3.valor
    );
    nuevoBien.guardarDatos();
    inventario.agregarBien(nuevoBien);
    console.log("Bien comprado con éxito.");
  } catch (error) {
    console.error("Error al agregar el bien:", error.message);
  }
    
    const bien = inventario.getUltimoBien();

    console.log("introduce cantidad de coronas a pagar");
   
    const respuestas4 = await inquirer.prompt([
      { type: "number", name: "cantidadCoronas", message: "Cantidad de coronas a pagar:" }
    ]);

    
    if (bien.valorCoronas < respuestas4.cantidadCoronas) {
      console.log("Oooh el mercader no tiene suficiente dinero");
      return;
    }


   
    console.log(`Has comprado el bien ${bien.nombre} al mercader ${mercader.nombre}`);

    
    inventario.comprar(respuestas.id, respuestas2.cantidadCoronas);

  } catch (error) {
    console.error("Error al realizar la compra:", error.message);
  }
}
/**
 * Función para realizar una venta.
 */
export async function realizarVenta() {
  try {
    console.log("Realizar venta");

    await cargarTodoDesdeJSON();

    const { id: clienteId } = await inquirer.prompt([
      { type: "input", name: "id", message: "ID del cliente:" },
    ]);

    const cliente = inventario.buscarClientePorId(clienteId);
    if (!cliente) {
      console.log("Cliente no encontrado.");
      return;
    }

    const { idBien } = await inquirer.prompt([
      { type: "input", name: "idBien", message: "ID del bien que deseas vender:" },
    ]);

    const bien = inventario.buscarBienPorId(idBien);
    if (!bien) {
      console.log("Bien no encontrado.");
      return;
    }

    inventario.vender(clienteId, idBien);

    const data = await fs.readFile("./db/Bien.json", "utf-8");
    const bienes: any[] = JSON.parse(data);

    const indice = bienes.findIndex(b => b._idUnico === idBien.trim());
    if (indice === -1) {
      console.log("No se encontró el bien con el ID proporcionado en la base de datos.");
      return;
    }

    bienes.splice(indice, 1);
    await fs.writeFile("./db/Bien.json", JSON.stringify(bienes, null, 2), "utf-8");

    console.log(`Bien con ID "${idBien}" vendido con éxito al cliente con ID "${clienteId}".`);
  } catch (error) {
    console.error("Error al realizar la venta:", error.message);
  }
}
