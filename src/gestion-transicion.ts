import { Transaccion } from "./trancision.js";

/**
 * Clase que gestiona las transacciones
 */
export class GestorTransacciones {
  private transacciones: Transaccion[] = [];

  /**
   * Método para registrar una venta
   * @param fecha - Fecha de la venta
   * @param bienes - Bienes intercambiados
   * @param cantidadCoronas - Cantidad de coronas involucrada
   * @param detalles - Detalles adicionales
   */
  registrarVenta(fecha: Date, bienes: string[], cantidadCoronas: number, detalles: string): void {
    const transaccion = new Transaccion("venta", fecha, bienes, cantidadCoronas, detalles);
    this.transacciones.push(transaccion);
  }

  /**
   * Método para registrar una compra
   * @param fecha - Fecha de la compra
   * @param bienes - Bienes intercambiados
   * @param cantidadCoronas - Cantidad de coronas involucrada
   * @param detalles - Detalles adicionales
   */
  registrarCompra(fecha: Date, bienes: string[], cantidadCoronas: number, detalles: string): void {
    const transaccion = new Transaccion("compra", fecha, bienes, cantidadCoronas, detalles);
    this.transacciones.push(transaccion);
  }

  /**
   * Método para registrar una devolución
   * @param fecha - Fecha de la devolución
   * @param bienes - Bienes devueltos
   * @param cantidadCoronas - Cantidad de coronas involucrada
   * @param detalles - Detalles adicionales
   */
  registrarDevolucion(fecha: Date, bienes: string[], cantidadCoronas: number, detalles: string): void {
    const transaccion = new Transaccion("devolucion", fecha, bienes, cantidadCoronas, detalles);
    this.transacciones.push(transaccion);
  }

  /**
   * Método para obtener el historial de transacciones
   * @returns - Historial de transacciones
   */
  obtenerHistorial(): Transaccion[] {
    return this.transacciones;
  }
}