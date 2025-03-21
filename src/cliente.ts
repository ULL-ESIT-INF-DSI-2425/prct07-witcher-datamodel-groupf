// cliente.ts

import { DatabaseManager } from "./dataBase.js";

/**
 * Clase que reprsenta a todas las criaturas que buscan herramientas
 */
export class Cliente {
  /**
   * Constructor de la clase cliente
   * @param _idUnico - idUnico del cliente
   * @param _nombre - nombre del cliente
   * @param _raza - raza del cliente
   * @param _ubicacion - ubicacion del cliente
   */
  constructor(
    private _idUnico: string,
    private _nombre: string,
    private _raza: string,
    private _ubicacion: string,
  ) {
    DatabaseManager.guardarDatos('Cliente', this);
  }

  // Getter

  /**
   * Getter que devuelve el idUnico del cliente
   * @returns - idUnico del cliente
   */
  get idUnico(): string {
    return this._idUnico;
  }

  /**
   * Getter que devuelve el nombre del cliente
   * @returns - nombre del cliente
   */
  get nombre(): string {
    return this._nombre;
  }

  /**
   * Getter que devuelve la raza del cliente
   * @returns - raza del cliente
   */
  get raza(): string {
    return this._raza;
  }

  /**
   * Getter que devuelve la ubicacion de donde esta el cliente
   * @returns ubciacion del cliente
   */
  get ubicacion(): string {
    return this._ubicacion;
  }

  // setter

  /**
   * Setter que establece el idUnico del cliente
   * @param idUnico - idUnico del cliente
   */
  set idUnico(idUnico: string) {
    this._idUnico = idUnico;
  }

      /**
   * Setter que establece el nombre del cliente
   * @param nombre - nombre del cliente
   */
    set nombre(nombre: string) {
      this._nombre = nombre;
  }

  /**
   * Setter que estalece la raza del cliente
   * @param raza - raza del cliente
   */
  set raza(raza: string) {
      this._raza = raza;
  }

  /**
   * Setter que establece la ubicacion del cliente
   * @param ubicacion - ubicacion del cliente
   */
  set ubicacion(ubicacion: string) {
    this._ubicacion = ubicacion;
  }
}