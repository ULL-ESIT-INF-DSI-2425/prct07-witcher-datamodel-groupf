import { Mercader } from "./mercaderes.js";
import { Cliente } from "./cliente.js";
import { Bien } from "./bienes.js";
import { GestorTransacciones } from "./gestion-transicion.js";
import { Transaccion } from "./trancision.js";

/**
 * Clase que representa el inventario
 */
export class Inventario {
  private bienes: Bien[] = [];
  private mercaderes: Mercader[] = [];
  private clientes: Cliente[] = [];
  private gestorTransacciones: GestorTransacciones;

  // Getters
  get gestorTransaccioness(): GestorTransacciones {
    return this.gestorTransacciones;
  }
  
  /**
   * Constructor de la clase Inventario
   */
  constructor() {
    this.gestorTransacciones = new GestorTransacciones();
  }

  /**
   * Método para agregar un bien al inventario
   * @param bien - bien a agregar
   */
  agregarBien(bien: Bien) {
    this.bienes.push(bien);
  }

  /**
   * Método para agregar un mercader al inventario
   * @param mercader - mercader a agregar
   */
  agregarMercader(mercader: Mercader) {
    this.mercaderes.push(mercader);
  }

  /**
   * Método para agregar un cliente al inventario
   * @param cliente - cliente a agregar
   */
  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  /**
   * Método para eliminar un bien del inventario
   * @param id - id del bien a eliminar
   * @returns true si se eliminó el bien, false en caso contrario
   */
  eliminarBien(id: string): boolean {
    const index = this.bienes.findIndex(bien => bien.idUnico === id);
    if (index !== -1) {
      this.bienes.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Método para eliminar un mercader del inventario
   * @param id - id del mercader a eliminar
   * @returns true si se eliminó el mercader, false en caso contrario
   */
  eliminarMercader(id: string): boolean {
    const index = this.mercaderes.findIndex(mercader => mercader.idUnico === id);
    if (index !== -1) {
      this.mercaderes.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Método para eliminar un cliente del inventario
   * @param id - id del cliente a eliminar
   * @returns true si se eliminó el cliente, false en caso contrario
   */
  eliminarCliente(id: string): boolean {
    const index = this.clientes.findIndex(cliente => cliente.idUnico === id);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Método para registrar una venta
   * @param clienteId - id del cliente
   * @param bienes - bienes a vender
   * @param cantidadCoronas - cantidad de coronas
   * @param detalles - detalles de la venta
   * @returns true si se registró la venta, false en caso contrario
   */
  registrarVenta(clienteId: string, bienes: string[], cantidadCoronas: number, detalles: string): boolean {
    const cliente = this.clientes.find(cliente => cliente.idUnico === clienteId);
    if (cliente) {
      this.gestorTransacciones.registrarVenta(new Date(), bienes, cantidadCoronas, detalles);
      return true;
    }
    return false;
  }

  /**
   * Método para registrar una compra
   * @param mercaderId - id del mercader
   * @param bienes - bienes a comprar
   * @param cantidadCoronas - cantidad de coronas
   * @param detalles - detalles de la compra
   * @returns true si se registró la compra, false en caso contrario
   */
  registrarCompra(mercaderId: string, bienes: string[], cantidadCoronas: number, detalles: string): boolean {
    const mercader = this.mercaderes.find(mercader => mercader.idUnico === mercaderId);
    if (mercader) {
      this.gestorTransacciones.registrarCompra(new Date(), bienes, cantidadCoronas, detalles);
      return true;
    }
    return false;
  }

  /**
   * Método para registrar una devolución
   * @param actorId - id del actor
   * @param bienes - bienes a devolver
   * @param cantidadCoronas - cantidad de coronas
   * @param detalles - detalles de la devolución
   * @param tipo - tipo de actor
   * @returns true si se registró la devolución, false en caso contrario
   */
  registrarDevolucion(actorId: string, bienes: string[], cantidadCoronas: number, detalles: string, tipo: "cliente" | "mercader"): boolean {
    if (tipo === "cliente") {
      const cliente = this.clientes.find(cliente => cliente.idUnico === actorId);
      if (cliente) {
        this.gestorTransacciones.registrarDevolucion(new Date(), bienes, cantidadCoronas, detalles);
        return true;
      }
    } else if (tipo === "mercader") {
      const mercader = this.mercaderes.find(mercader => mercader.idUnico === actorId);
      if (mercader) {
        this.gestorTransacciones.registrarDevolucion(new Date(), bienes, cantidadCoronas, detalles);
        return true;
      }
    }
    return false;
  }

  /**
   * Método para obtener el historial de transacciones
   * @returns historial de transacciones
   */
  obtenerHistorialTransacciones(): Transaccion[] {
    return this.gestorTransacciones.obtenerHistorial();
  }

  /**
   * Metodo para listar los bienes
   * @returns - bienes
   */
  listarBienes(): Bien[] {
    return this.bienes;
  }

  /**
   * Metodo para listar los mercaderes
   * @returns - mercaderes
   */
  listarMercaderes(): Mercader[] {
    return this.mercaderes;
  }

  /**
   * Metodo para listar los clientes
   * @returns - clientes
   */
  listarClientes(): Cliente[] {
    return this.clientes;
  }

  
  /**
   * Metodo para ordenar los bienes por nombre
   * @param ascendente - booleano para ordenar de forma ascendente o descendente
   * @returns - lista de bienes ordenados por nombre
   */
  ordenarBienesPorNombre(ascendente: boolean): Bien[] {
    return this.bienes.sort((a, b) => {
      if (ascendente) {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });
  }

  /**
   * Metodo para ordenar los bienes por valor
   * @param ascendente - booleano para ordenar de forma ascendente o descendente
   * @returns - lista de bienes ordenados por valor
   */
  ordenarBienesPorValor(ascendente: boolean): Bien[] {
    return this.bienes.sort((a, b) => {
      if (ascendente) {
        return a.valorCoronas - b.valorCoronas;
      } else {
        return b.valorCoronas - a.valorCoronas;
      }
    });
  }

  /**
   * Metodo para modificar los atributos de un bien
   * @param id - id del bien a modificar
   * @param nuevosDatos  - nuevos datos del bien
   * @returns - true si se modifico el bien, false en caso contrario
   */
  modificarBien(id: string, nuevosDatos: Partial<Bien>): boolean {
    const bien = this.bienes.find(bien => bien.idUnico === id);
    if (bien) {
      Object.assign(bien, nuevosDatos);
      return true;
    }
    return false;
  }

    /**
     * Metodo para modificar los atributos del mercader
     * @param id - identificador del mercader
     * @param nuevosDatos - objeto mercader con todos los nuevos datos
     * @returns - true si se modifico el mercader, false en caso contrario
     */
  modificarMercader(id: string, nuevosDatos: Partial<Mercader>): boolean {
    const mercader = this.mercaderes.find(mercader => mercader.idUnico === id);
    if (mercader) {
      Object.assign(mercader, nuevosDatos);
      return true;
    }
    return false;
  }

  /**
   * Metodo para modificar los atributos del cliente
   * @param id - identificador del cliente
   * @param nuevosDatos - nuevos datos del cliente
   * @returns - true si se modifico el cliente, false en caso contrario
   */
  modificarCliente(id: string, nuevosDatos: Partial<Cliente>): boolean {
    const cliente = this.clientes.find(cliente => cliente.idUnico === id);
    if (cliente) {
      Object.assign(cliente, nuevosDatos);
      return true;
    }
    return false;
  }

  /**
   * Metodo para buscar un bien por nombre
   * @param nombre - nombre del bien a buscar
   * @returns - bien encontrado
   */
  buscarBien(nombre: string): Bien | undefined {
    return this.bienes.find(bien => bien.nombre.toLowerCase() === nombre.toLowerCase());
  }

  /**
   * Metodo para buscar un mercader por nombre
   * @param nombre - nombre del mercader a buscar
   * @returns - mercader encontrado
   */
  buscarMercader(nombre: string): Mercader | undefined {
    return this.mercaderes.find(mercader => mercader.nombre.toLowerCase() === nombre.toLowerCase());
  }

  /**
   * Metodo para buscar un cliente por un nombre
   * @param nombre - nombre del cliente a buscar
   * @returns - cliente encontrado
   */
  buscarCliente(nombre: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.nombre.toLowerCase() === nombre.toLowerCase());
  }

  /**
 * Método para obtener el stock de un bien por su nombre
 * @param nombre - nombre del bien a consultar
 * @returns - cantidad de bienes con ese nombre
 */
  obtenerStockPorNombre(nombre: string): number {
    return this.bienes.filter(bien => bien.nombre.toLowerCase() === nombre.toLowerCase()).length;
  }

  /**
 * Método para obtener el stock de bienes por tipo de material
 * @param material - material del bien a consultar
 * @returns - cantidad de bienes con ese material
 */
  obtenerStockPorMaterial(material: string): number {
    return this.bienes.filter(bien => bien.material.toLowerCase() === material.toLowerCase()).length;
  }
}
