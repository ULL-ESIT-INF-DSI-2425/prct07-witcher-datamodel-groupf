import * as fs from 'fs';
import * as path from 'path';

export class DatabaseManager {
  private static dbPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../db');

  static guardarDatos(tipo: string, datos: any) {
    const filePath = path.join(this.dbPath, `${tipo}.json`);

    // Asegúrate de que el directorio existe antes de intentar guardar el archivo
    if (!fs.existsSync(this.dbPath)) {
      fs.mkdirSync(this.dbPath, { recursive: true });
    }

    // Verificar si el archivo existe y si no, crear el archivo vacío
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([])); // Crea un archivo vacío si no existe
    }

    let contenido: any[] = [];
    const rawData = fs.readFileSync(filePath, 'utf8');
    if (rawData) {
      contenido = JSON.parse(rawData);
    }

    contenido.push(datos);
    fs.writeFileSync(filePath, JSON.stringify(contenido, null, 2));
  }

  static leerDatos(tipo: string): any[] {
    const filePath = path.join(this.dbPath, `${tipo}.json`);

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  }
}
