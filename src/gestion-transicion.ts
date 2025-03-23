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

  /**
 * Método para obtener los bienes más vendidos
 * @returns - Lista de bienes con la cantidad de veces que han sido vendidos
 */
  obtenerBienesMasVendidos(): { nombre: string, cantidad: number }[] {
    const ventas = this.transacciones.filter(transaccion => transaccion.tipo === "venta");
    const bienesVendidos: { [key: string]: number } = {};

    ventas.forEach(venta => {
        venta.bienes.forEach(bien => {
            if (bienesVendidos[bien]) {
                bienesVendidos[bien]++;
            } else {
                bienesVendidos[bien] = 1;
            }
        });
    });

    return Object.entries(bienesVendidos)
        .map(([nombre, cantidad]) => ({ nombre, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad);
  }

  /**
 * Método para obtener el total de ingresos por ventas
 * @returns - Total de ingresos por ventas
 */
  obtenerTotalIngresos(): number {
    return this.transacciones
        .filter(transaccion => transaccion.tipo === "venta")
        .reduce((total, venta) => total + venta.cantidadCoronas, 0);
  }

  /**
  * Método para obtener el total de gastos por compras
  * @returns - Total de gastos por compras
  */
  obtenerTotalGastos(): number {
    return this.transacciones
        .filter(transaccion => transaccion.tipo === "compra")
        .reduce((total, compra) => total + compra.cantidadCoronas, 0);
  }


/**
 * Método para obtener el historial de transacciones de un cliente o mercader
 * @param id - ID del cliente o mercader
 * @param tipo - Tipo de actor ("cliente" o "mercader")
 * @returns - Lista de transacciones relacionadas con el cliente o mercader
 */
  obtenerHistorialPorActor(id: string, tipo: "cliente" | "mercader"): Transaccion[] {
    return this.transacciones.filter(transaccion => {
        if (tipo === "cliente") {
            return transaccion.tipo === "venta" && transaccion.bienes.includes(id);
        } else if (tipo === "mercader") {
            return transaccion.tipo === "compra" && transaccion.bienes.includes(id);
        }
        return false;
    });
  }
}