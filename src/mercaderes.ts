import { DatabaseManager } from "./dataBase.js";
/**
 * Clase que representa a cada Mercader
 */
export class Mercader {
  /**
   * Constructor de la calse Mercader
   * @param _id - id unico del mercader
   * @param _nombre - Nombre del mercader
   * @param _tipo - Tipo de ofiacio del mercader
   * @param _ubicacion - Lugar donde se encuentra el mercader
   */
  constructor(
    private _id: string,
    private  _nombre: string,
    private _tipo: string,
    private _ubicacion: string,
  ) {
    DatabaseManager.guardarDatos('Mercader', this);
  } 


  /**
   * Getter que devuelve  el id del Mercader
   * @returns idUnico del mercader
   */
  get idUnico(): string {
    return this._id;
  }


  /**
   * Getter qie devuelve el nombre del mercader
   * @returns nombre del mercader
   */
  get nombre(): string {
    return this._nombre;
  }

  /**
   * Getter que devuelve el tipo de oficio del mercader
   * @returns tipo de oficio
   */
  get tipo(): string {
    return this._tipo;
  }

  /**
   * Getter que devuelve la ubicacion de donde esta el mercader
   * @returns ubciacion del mercader
   */
  get ubicacion(): string {
    return this._ubicacion;
  }

  /**
   * Setter que modifica el valor del id del mercader
   * @param id - id del mercader
   */
  set idUnico(id: string) {
    this._id = id;
  }
  
    /**
   * Setter que modifica el valor del nombre del mercader
   * @param nombre - nombre del mercader
   */
  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  /**
   * Setter que modifica el valor del tipo de oficio del mercader
   * @param tipo - tipo de oficio del mercader
   */
  set tipo(tipo: string) {
    this._tipo = tipo;
  }

  /**
   * Setter que modifica la ubicacion del mercader
   * @param ubicacion - ubicacion del mercader
   */
  set ubicacion(ubicacion: string) {
    this._ubicacion = ubicacion;
  }
}