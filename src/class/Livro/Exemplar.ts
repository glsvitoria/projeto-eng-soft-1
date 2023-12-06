import { Emprestimo } from "../Emprestimo/Emprestimo";
import { Disponivel } from "../LivroState/Disponivel";
import { EstadoExemplar } from "../LivroState/EstadoExemplar";
import { Livro } from "./Livro";

export class Exemplar {
  private codigoExemplar: string;
  private livro: Livro;
  private estado: EstadoExemplar;
  private ultimoEmprestimo: Emprestimo | null = null;

  constructor(livro: Livro, codigoExemplar: string) {
    this.codigoExemplar = codigoExemplar;
    this.livro = livro;
    this.estado = new Disponivel(this);
  }

  getUltimoEmprestimo(): Emprestimo | null {
    return this.ultimoEmprestimo;
  }

  setUltimoEmprestimo(ultimoEmprestimo: Emprestimo | null): void {
    this.ultimoEmprestimo = ultimoEmprestimo;
  }

  getEstado(): EstadoExemplar {
    return this.estado;
  }

  getLivro(): Livro {
    return this.livro;
  }

  getCodigoExemplar(): string {
    return this.codigoExemplar;
  }

  setEstado(estado: EstadoExemplar): void {
    this.estado = estado;
  }

  getStatusString(): string {
    return this.estado.status ? "Disponível" : "Emprestado";
  }
}
