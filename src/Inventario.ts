import { Bien } from "./bienes.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercaderes.js";

interface Transaccion {
  fecha: Date;
  tipo: "venta" | "compra" | "devolucion";
  bien: Bien;
  cantidad: number;
  coronas: number;
  participante: Cliente | Mercader;
}

export class Inventario {
  private bienes: Bien[] = [];
  private mercaderes: Mercader[] = [];
  private clientes: Cliente[] = [];
  private transacciones: Transaccion[] = [];

  agregarBien(bien: Bien) {
    this.bienes.push(bien);
  }

  agregarMercader(mercader: Mercader) {
    this.mercaderes.push(mercader);
  }

  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  registrarTransaccion(transaccion: Transaccion) {
    this.transacciones.push(transaccion);
  }

  obtenerStock(): Bien[] {
    return this.bienes;
  }

  obtenerHistorialTransacciones(): Transaccion[] {
    return this.transacciones;
  }
}
