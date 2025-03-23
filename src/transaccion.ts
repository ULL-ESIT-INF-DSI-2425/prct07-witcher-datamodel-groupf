// Importar las dependencias necesarias
import { DatabaseManager } from "./dataBase.js";

/**
 * Clase Transaccion que representa una transaccion de compra o venta de bienes
 */
export class Transaccion {
  /**
   * 
   * @param _tipo - tipo de transaccion (compra o venta)
   * @param _fecha - fecha de la transaccion
   * @param _bienes - bienes involucrados en la transaccion
   * @param _cantidadCoronas - cantidad de coronas involucradas en la transaccion
   * @param _comprador - comprador de los bienes
   * @param _vendedor - vendedor de los bienes
   */
  constructor(
    private _tipo: string,
    private _fecha: Date,
    private _bienes: string[],
    private _cantidadCoronas: number,
    private _comprador: string,
    private _vendedor: string,
  ) {}

  /**
   * Metodo para guardar los datos de la transaccion en la base de datos
   */
  guardarDatos() {
    DatabaseManager.guardarDatos('Transaccion', this);
  }

  /**
   * Getter que devuelve el tipo de la transaccion
   * @returns tipo de la transaccion
   */
  get tipo(): string {
    return this._tipo;
  }

  /**
   * Getter que devuelve la fecha de la transaccion
   * @returns fecha de la transaccion
   */
  get fecha(): Date {
    return this._fecha;
  }

  /**
   * Getter que devuelve los bienes involucrados en la transaccion
   * @returns bienes involucrados en la transaccion
   */
  get bienes(): string[] {
    return this._bienes;
  }

  /**
   * Getter que devuelve la cantidad de coronas involucradas en la transaccion
   * @returns cantidad de coronas involucradas en la transaccion
   */
  get cantidadCoronas(): number {
    return this._cantidadCoronas;
  }

  /**
   * Getter que devuelve el comprador de los bienes
   * @returns comprador de los bienes
   */
  get comprador(): string {
    return this._comprador;
  }

  /**
   * Getter que devuelve el vendedor de los bienes
   * @returns vendedor de los bienes
   */
  get vendedor(): string {
    return this._vendedor;
  }

 
  /**
   * Setter que establece el tipo de la transaccion
   * @param tipo - tipo de la transaccion
   */
  set tipo(tipo: string) {
    this._tipo = tipo;
  }

  /**
   * Setter que establece la fecha de la transaccion
   * @param fecha - fecha de la transaccion
   */
  set fecha(fecha: Date) {
    this._fecha = fecha;
  }

  /**
   * Setter que establece la cantidad de coronas involucradas en la transaccion
   * @param cantidadCoronas - cantidad de coronas involucradas en la transaccion
   */
  set cantidadCoronas(cantidadCoronas: number) {
    this._cantidadCoronas = cantidadCoronas;
  }

  /**
   * Setter que establece el comprador de los bienes
   * @param comprador - comprador de los bienes
   */
  set comprador(comprador: string) {
    this._comprador = comprador;
  }

  /**
   * Setter que establece el vendedor de los bienes
   * @param vendedor - vendedor de los bienes
   */
  set vendedor(vendedor: string) {
    this._vendedor = vendedor;
  }

  /**
   * Metodo que añade un bien a la lista de bienes
   * @param bien - bien a añadir
   */
  addBien(bien: string) {
    this._bienes.push(bien);
  }
}
