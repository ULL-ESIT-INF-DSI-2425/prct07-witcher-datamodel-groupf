import { Mercader } from "./models/mercaderes.js";
import { Cliente } from "./models/cliente.js";
import { Bien } from "./models/bienes.js";

/**
 * Clase que representa el inventario
 */
export class Inventario {
  private bienes: Bien[] = [];
  private mercaderes: Mercader[] = [];
  private clientes: Cliente[] = [];
  private compras: [string, number][] = [];
  private ventas: [string, string][] = [];

  /**
   * Constructor de la clase Inventario
   */
  constructor() {
  }

  /**
   * Metodo para limpiar el vector de bienes
   */
  limpiarBienes() {
    this.bienes = [];
  }


  /**
   * Metodo para buscar un bien por su nombre
   * @param nombre - nombre del bien a buscar
   * @returns - bien encontrado
   */
  buscarBienPorId(id: string): Bien | undefined {
    return this.bienes.find(bien => bien.idUnico === id);
  }

  /**
   * Metodo para buscar un mercader por su id
   * @param id - id del mercader a buscar
   * @returns - mercader encontrado
   */
  buscarMercaderPorId(id: string): Mercader | undefined {
    return this.mercaderes.find(mercader => mercader.idUnico === id);
  }

  /**
   * Metodo para buscar un cliente por su id
   * @param id - id del cliente a buscar
   * @returns - cliente encontrado
   */
  buscarClientePorId(id: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.idUnico === id);
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
   * Metodo para listar los bienes
   * @returns - bienes
   */
  listarBienes() {
    console.log(this.bienes);
  }

  /**
   * Metodo para listar los mercaderes
   * @returns - mercaderes
   */
  listarMercaderes() {
    console.log(this.mercaderes);
  }

  /**
   * Metodo para listar los clientes
   * @returns - clientesinventario
   */
  listarClientes() {
    console.log(this.clientes);
  }

  /**
   * Metodo para limpiar los mercaderes
   *
   */
  limpiarMercaderes() {
    this.mercaderes = [];
  }

  /**
   * Metodo para limpiar los clientes
   */
  limpiarClientes() {
    this.clientes = [];
  }

  /**
   * Metodo para buscar un bien por su nombre
   * @param nombre - nombre del bien a buscar
   * @param atributo - atributo por el cual se va a buscar
   * @param busca - valor a buscar
   * @returns - bien encontrado o undefined si no se encuentra
   */
  buscar(nombre: string, atributo: string, busca: string | number): Bien[] | Mercader[] | Cliente[] | undefined {
    console.log(atributo)
    if (nombre === "bienes") {
      if (atributo === "nombre") {
        return this.bienes.filter(bien => bien.nombre === busca);
      } else if (atributo === "material") {
        return this.bienes.filter(bien => bien.material === busca);
      } else if (atributo === "peso") {
        return this.bienes.filter(bien => bien.peso === busca);
      } else if (atributo === "valorCoronas") {
        return this.bienes.filter(bien => bien.valorCoronas === busca);
      } else if (atributo === "descripcion") {
        console.log("descp")
        return this.bienes.filter(bien => bien.descripcion === busca);
      }
    }
    
    if (nombre === "mercaderes") {
      
      if (atributo === "nombre") {
        return this.mercaderes.filter(mercader => mercader.nombre === busca);
      } else if (atributo === "tipo") {
        return this.mercaderes.filter(mercader => mercader.tipo === busca);
      } else if (atributo === "ubicacion") {
        return this.mercaderes.filter(mercader => mercader.ubicacion === busca);
      }
    }
 
    if (nombre === "clientes") {
      
      if (atributo === "nombre") {
        return this.clientes.filter(cliente => cliente.nombre === busca);
      } else if (atributo === "raza") {
        return this.clientes.filter(cliente => cliente.raza === busca);
      } else if (atributo === "ubicacion") {
        return this.clientes.filter(cliente => cliente.ubicacion === busca);
      }
    }
    return undefined;
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

  /**
   * Método para obtener el stock de bienes
   * @returns - cantidad de bienes en el inventario
   */
  stock_size(): number {
    return this.bienes.length;
  }

  /**
   * Método para comprar un bien
   * @param id - id del mercader
   * @param cantidadCoronas - cantidad de coronas a pagar
   * @returns - true si se realizó la compra, false en caso contrario
   */
  comprar(id: string, cantidadCoronas: number): boolean {
    const mercader = this.mercaderes.find(mercader => mercader.idUnico === id);
    if (!mercader) {
      console.log("Mercader no encontrado.");
      return false;
    }
    this.compras.push([id, cantidadCoronas]);
    return true;
  }

  /**
   * Método para obtener el último bien añadido 
   * @returns - último bien añadido
   */
  getUltimoBien(): Bien {
    return this.bienes[this.bienes.length - 1];
  }

  /**
   * Metodo para vender un bien
   * @param id - id del cliente
   * @param id_bien - id del bien a vender
   * @returns - true si se realizó la venta, false en caso contrario .
   */
  vender(id: string, id_bien: string): boolean {
    const cliente = this.clientes.find(cliente => cliente.idUnico === id);
    if (!cliente) {
      console.log("Cliente no encontrado.");
      return false;
    }  


    this.ventas.push([id, id_bien]);
    this.bienes = this.bienes.filter(bien => bien.idUnico !== id_bien); 
    return true;
  }
}
