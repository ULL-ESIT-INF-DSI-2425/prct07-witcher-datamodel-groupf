// src/models/Inventario.ts
import { Bien } from "./bienes.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercaderes.js";

export class Inventario {
  private bienes: Bien[] = [];
  private mercaderes: Mercader[] = [];
  private clientes: Cliente[] = [];

  // Agregar elementos
  agregarBien(bien: Bien) {
    this.bienes.push(bien);
  }

  agregarMercader(mercader: Mercader) {
    this.mercaderes.push(mercader);
  }

  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  // Consultas
  buscarBien(nombre: string): Bien | undefined {
    return this.bienes.find(bien => bien.nombre.toLowerCase() === nombre.toLowerCase());
  }

  listarBienes(): Bien[] {
    return this.bienes;
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }

  listarMercaderes(): Mercader[] {
    return this.mercaderes;
  }
}
