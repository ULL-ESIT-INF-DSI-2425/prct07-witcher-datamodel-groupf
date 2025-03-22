import { Mercader } from "./mercaderes.js";
import { Cliente } from "./cliente.js";
import { Bien } from "./bienes.js";
import { GestorTransacciones } from "./gestion-transicion.js";
import { Transaccion } from "./trancision.js";

export class Inventario {
  private bienes: Bien[] = [];
  private mercaderes: Mercader[] = [];
  private clientes: Cliente[] = [];
  private gestorTransacciones: GestorTransacciones;

  constructor() {
    this.gestorTransacciones = new GestorTransacciones();
  }

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

  // Registrar transacciones
  registrarVenta(clienteId: string, bienes: string[], cantidadCoronas: number, detalles: string): boolean {
    const cliente = this.clientes.find(cliente => cliente.idUnico === clienteId);
    if (cliente) {
      this.gestorTransacciones.registrarVenta(new Date(), bienes, cantidadCoronas, detalles);
      return true;
    }
    return false;
  }

  registrarCompra(mercaderId: string, bienes: string[], cantidadCoronas: number, detalles: string): boolean {
    const mercader = this.mercaderes.find(mercader => mercader.idUnico === mercaderId);
    if (mercader) {
      this.gestorTransacciones.registrarCompra(new Date(), bienes, cantidadCoronas, detalles);
      return true;
    }
    return false;
  }

  registrarDevolucion(actorId: string, bienes: string[], cantidadCoronas: number, detalles: string, tipo: "cliente" | "mercader"): boolean {
    if (tipo === "cliente") {
      const cliente = this.clientes.find(cliente => cliente.idUnico === actorId);
      if (cliente) {
        this.gestorTransacciones.registrarDevolucion(new Date(), bienes, cantidadCoronas, detalles);
        return true;
      }
    } else if (tipo === "mercader") {
      const mercader = this.mercaderes.find(mercader => mercader.idUnico === actorId);
      if (mercader) {
        this.gestorTransacciones.registrarDevolucion(new Date(), bienes, cantidadCoronas, detalles);
        return true;
      }
    }
    return false;
  }

  // Obtener historial de transacciones
  obtenerHistorialTransacciones(): Transaccion[] {
    return this.gestorTransacciones.obtenerHistorial();
  }

  // Listar todos los bienes
listarBienes(): Bien[] {
  return this.bienes;
}

// Listar todos los mercaderes
listarMercaderes(): Mercader[] {
  return this.mercaderes;
}

// Listar todos los clientes
listarClientes(): Cliente[] {
  return this.clientes;
}


// Ordenar bienes por nombre
ordenarBienesPorNombre(ascendente: boolean): Bien[] {
  return this.bienes.sort((a, b) => {
    if (ascendente) {
      return a.nombre.localeCompare(b.nombre);
    } else {
      return b.nombre.localeCompare(a.nombre);
    }
  });
}

// Ordenar bienes por valor en coronas
ordenarBienesPorValor(ascendente: boolean): Bien[] {
  return this.bienes.sort((a, b) => {
    if (ascendente) {
      return a.valorCoronas - b.valorCoronas;
    } else {
      return b.valorCoronas - a.valorCoronas;
    }
  });
}

// Modificar un bien
modificarBien(id: string, nuevosDatos: Partial<Bien>): boolean {
  const bien = this.bienes.find(bien => bien.idUnico === id);
  if (bien) {
    Object.assign(bien, nuevosDatos);
    return true;
  }
  return false;
}

// Modificar un mercader
modificarMercader(id: string, nuevosDatos: Partial<Mercader>): boolean {
  const mercader = this.mercaderes.find(mercader => mercader.idUnico === id);
  if (mercader) {
    Object.assign(mercader, nuevosDatos);
    return true;
  }
  return false;
}

// Modificar un cliente
modificarCliente(id: string, nuevosDatos: Partial<Cliente>): boolean {
  const cliente = this.clientes.find(cliente => cliente.idUnico === id);
  if (cliente) {
    Object.assign(cliente, nuevosDatos);
    return true;
  }
  return false;
}

// Buscar un bien por nombre
buscarBien(nombre: string): Bien | undefined {
  return this.bienes.find(bien => bien.nombre.toLowerCase() === nombre.toLowerCase());
}

// Buscar un mercader por nombre
buscarMercader(nombre: string): Mercader | undefined {
  return this.mercaderes.find(mercader => mercader.nombre.toLowerCase() === nombre.toLowerCase());
}

// Buscar un cliente por nombre
buscarCliente(nombre: string): Cliente | undefined {
  return this.clientes.find(cliente => cliente.nombre.toLowerCase() === nombre.toLowerCase());
}

}

