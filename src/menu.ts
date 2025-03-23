import inquirer from "inquirer";
import * as Funcionamiento from "./Funcionamiento.js";


/**
 * Función que muestra el menú principal y llama a las funciones correspondientes
 */
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

/**
 * Función que muestra el submenú de añadir y llama a las funciones correspondientes
 */
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
      await Funcionamiento.agregarBien();
      break;
    case "Añadir un mercader":
      await Funcionamiento.agregarMercader();
      break;
    case "Añadir un cliente":
      await Funcionamiento.agregarCliente();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuAñadir();
}

/**
 * Función que muestra el submenú de eliminar y llama a las funciones correspondientes
 */
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
      await Funcionamiento.eliminarBien();
      break;
    case "Eliminar un mercader":
      await Funcionamiento.eliminarMercader();
      break;
    case "Eliminar un cliente":
      await Funcionamiento.eliminarCliente();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuEliminar();
}

/**
 * Función que muestra el submenú de modificar y llama a las funciones correspondientes
 */
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
      await Funcionamiento.modificarBien();
      break;
    case "Modificar un mercader":
      await Funcionamiento.modificarMercader();
      break;
    case "Modificar un cliente":
      await Funcionamiento.modificarCliente();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuModificar();
}

/**
 * Función que muestra el submenú de consultar y llama a las funciones correspondientes
 */
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
    await Funcionamiento.cargarBienesDesdeJSON();
    await Funcionamiento.consultarBienes();
    break;
    case "Consultar mercaderes":
    await Funcionamiento.cargarMercaderesDesdeJSON();
    await Funcionamiento.consultarMercaderes();
    break;
    case "Consultar clientes":
    await Funcionamiento.cargarClientesDesdeJSON();
    await Funcionamiento.consultarClientes();
    break;
    case "Volver al menú principal":
    return;
  }

  await menuConsultar(); 


}

/**
 * Función que muestra el submenú de buscar y llama a las funciones correspondientes
 */
async function menuBuscar() {
    const respuesta = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué deseas buscar?",
        choices: [
          "Buscar bien",
          "Buscar mercader",
          "Buscar cliente",
          "Volver al menú principal"
        ]
      }
    ]);
  
    switch (respuesta.opcion) {
      case "Buscar bien":
        await menuBuscarBien();
        break;
      case "Buscar mercader":
        await menuBuscarMercader();
        break;
      case "Buscar cliente":
        await menuBuscarCliente();
        break;
      case "Volver al menú principal":
        return;
    }
  
    await menuBuscar();
  }
  

/**
 * Función que muestra el submenú de buscar bienes y llama a las funciones correspondientes
 */
async function menuBuscarBien() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "criterio",
      message: "¿Cómo deseas buscar el bien?",
      choices: [
        "Por nombre",
        "Por Descripcion",
        "Por Material",
        "Volver al menú anterior"
      ]
    }
  ]);

  switch (respuesta.criterio) {
    case "Por nombre":
      await Funcionamiento.buscar("bienes", "nombre");
      break;
    case "Por Descripcion":
      await Funcionamiento.buscar("bienes", "descripcion");
      break;
    case "Por Material":
      await Funcionamiento.buscar("bienes", "material");
      break;
    case "Volver al menú anterior":
      return;
  }

  await menuBuscarBien();
}

/**
 * Función que muestra el submenú de buscar mercaderes y llama a las funciones correspondientes
 */
async function menuBuscarMercader() {
    const respuesta = await inquirer.prompt([
      {
        type: "list",
        name: "criterio",
        message: "¿Cómo deseas buscar el mercader?",
        choices: [
          "Por nombre",
          "Por tipo",
          "Por ubicación",
          "Volver al menú anterior"
        ]
      }
    ]);
  
    switch (respuesta.criterio) {
      case "Por nombre":
        await Funcionamiento.buscar("mercaderes", "nombre");
        break;
      case "Por tipo":
        await Funcionamiento.buscar("mercaderes", "tipo");
        break;
      case "Por ubicación":
        await Funcionamiento.buscar("mercaderes", "ubicacion");
        break;
      case "Volver al menú anterior":
        return;
    }
  
    await menuBuscarMercader();
  }
  

/**
 * Función que muestra el submenú de buscar clientes y llama a las funciones correspondientes
 */
async function menuBuscarCliente() {
    const respuesta = await inquirer.prompt([
      {
        type: "list",
        name: "criterio",
        message: "¿Cómo deseas buscar el cliente?",
        choices: [
          "Por nombre",
          "Por raza",
          "Por ubicación",
          "Volver al menú anterior"
        ]
      }
    ]);
  
    switch (respuesta.criterio) {
      case "Por nombre":
        await Funcionamiento.buscar("clientes", "nombre");
        break;
      case "Por raza":
        await Funcionamiento.buscar("clientes", "raza");
        break;
      case "Por ubicación":
        await Funcionamiento.buscar("clientes", "ubicacion");
        break;
      case "Volver al menú anterior":
        return;
    }
  
    await menuBuscarCliente();
  }

/**
 * Función que muestra el submenú de ordenar y llama a las funciones correspondientes
 */
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
        case "Ordenar bienes por nombre": {
          
            await Funcionamiento.cargarTodoDesdeJSON();
          
            const respuesta = await inquirer.prompt([
                {
                  type: "list",
                  name: "opcion",
                  message: "¿Cómo deseas ordenar los bienes?",
                  choices: [
                    "Ascendente",
                    "Descendente",
                  ]
                }
              ]);

            
            if (respuesta.opcion === "Ascendente") {
                await Funcionamiento.ordenarBienesPorNombre(true);
            } else {
                await Funcionamiento.ordenarBienesPorNombre(false);
            }
            break;
        }
        case "Ordenar bienes por valor": {
         
          await Funcionamiento.cargarTodoDesdeJSON();
        
          const respuesta = await inquirer.prompt([
              {
                type: "list",
                name: "opcion",
                message: "¿Cómo deseas ordenar los bienes?",
                choices: [
                  "Ascendente",
                  "Descendente",
                ]
              }
            ]);

         
          if (respuesta.opcion === "Ascendente") {
              await Funcionamiento.ordenarBienesPorValor(true);
          } else {
              await Funcionamiento.ordenarBienesPorValor(false);
          }
          break;
        }

        case "Volver al menú principal":
            return;
    }
  
    await menuOrdenar();
  }




/**
 * Función que muestra el submenú de informes y llama a las funciones correspondientes
 */
async function menuInformes() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué informe deseas generar?",
      choices: [
        "Cantidad del stock",
        "Bienes más vendidos",
        "Total de ingresos y gastos",
        "Historial de transacciones de un cliente o mercader",
        "Hacer transiciones",
        "Volver al menú principal",
        ""
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "Cantidad del stock":
      await Funcionamiento.stockDeUnBien();
      break;
    case "Hacer transiciones":
      await menuComprasVentas();
      break;
    case "Volver al menú principal":
      return;
  }

  await menuInformes();
}

/**
 * Función que muestra el menú de compras y ventas y llama a las funciones correspondientes
 */
async function menuComprasVentas() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "accion",
      message: "¿Qué acción deseas realizar?",
      choices: [
        "Comprar",
        "Vender",
        "Volver al menú principal"
      ]
    }
  ]);

  switch (respuesta.accion) {
    case "Comprar":
      await Funcionamiento.realizarCompra();
      break;
    case "Vender":
      await Funcionamiento.realizarVenta();
      break;
    case "Historial de transiciones":
      break;
    case "Volver al menú principal":
      return;
  }

  await menuComprasVentas();
}

menuPrincipal();



