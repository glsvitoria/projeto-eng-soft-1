import { Livro } from "../Livro/Livro";
import { Usuario } from "../Usuario/Usuario";

export class Reserva {
  private livro: Livro;
  private usuario: Usuario;
  private dataReserva: Date;

  constructor(livro: Livro, usuario: Usuario) {
    this.livro = livro;
    this.usuario = usuario;
    this.dataReserva = new Date();
  }

  getDataReserva(): Date {
    return this.dataReserva;
  }

  getLivro(): Livro {
    return this.livro;
  }

  setLivro(livro: Livro): void {
    this.livro = livro;
  }

  getUsuario(): Usuario {
    return this.usuario;
  }

  setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }
}
