/**
 * Clase que representa una transacción
 */
export class Transaccion {
    constructor(
      public tipo: "venta" | "compra" | "devolucion",
      public fecha: Date,
      public bienes: string[],
      public cantidadCoronas: number,
      public detalles: string
    ) {}
  }