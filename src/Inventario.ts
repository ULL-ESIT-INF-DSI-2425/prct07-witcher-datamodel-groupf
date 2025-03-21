// Inventario.ts
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

  // Eliminar elementos
  eliminarBien(id: string): boolean {
    const index = this.bienes.findIndex(bien => bien.idUnico === id);
    if (index !== -1) {
      this.bienes.splice(index, 1);
      return true;
    }
    return false;
  }

  eliminarMercader(id: string): boolean {
    const index = this.mercaderes.findIndex(mercader => mercader.idUnico === id);
    if (index !== -1) {
      this.mercaderes.splice(index, 1);
      return true;
    }
    return false;
  }

  eliminarCliente(id: string): boolean {
    const index = this.clientes.findIndex(cliente => cliente.idUnico === id);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }

  // Modificar elementos
  modificarBien(id: string, nuevosDatos: Partial<Bien>): boolean {
    const bien = this.bienes.find(bien => bien.idUnico === id);
    if (bien) {
      Object.assign(bien, nuevosDatos);
      return true;
    }
    return false;
  }

  modificarMercader(id: string, nuevosDatos: Partial<Mercader>): boolean {
    const mercader = this.mercaderes.find(mercader => mercader.idUnico === id);
    if (mercader) {
      Object.assign(mercader, nuevosDatos);
      return true;
    }
    return false;
  }

  modificarCliente(id: string, nuevosDatos: Partial<Cliente>): boolean {
    const cliente = this.clientes.find(cliente => cliente.idUnico === id);
    if (cliente) {
      Object.assign(cliente, nuevosDatos);
      return true;
    }
    return false;
  }

  // Consultas
  buscarBien(nombre: string): Bien | undefined {
    return this.bienes.find(bien => bien.nombre.toLowerCase() === nombre.toLowerCase());
  }

  buscarMercader(nombre: string): Mercader | undefined {
    return this.mercaderes.find(mercader => mercader.nombre.toLowerCase() === nombre.toLowerCase());
  }

  buscarCliente(nombre: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.nombre.toLowerCase() === nombre.toLowerCase());
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

  // Ordenar bienes
  ordenarBienesPorNombre(ascendente: boolean = true): Bien[] {
    return this.bienes.sort((a, b) => ascendente ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre));
  }

  ordenarBienesPorValor(ascendente: boolean = true): Bien[] {
    return this.bienes.sort((a, b) => ascendente ? a.valorCoronas - b.valorCoronas : b.valorCoronas - a.valorCoronas);
  }
}