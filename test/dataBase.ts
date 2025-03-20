// src/utils/DatabaseManager.ts
import * as fs from 'fs';
import * as path from 'path';

export class DatabaseManager {
  private static dbPath = path.join(__dirname, '../../db');

  static guardarDatos(tipo: string, datos: any) {
    const filePath = path.join(this.dbPath, `${tipo}.json`);

    if (!fs.existsSync(this.dbPath)) {
      fs.mkdirSync(this.dbPath, { recursive: true });
    }

    let contenido: any[] = [];
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, 'utf8');
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
