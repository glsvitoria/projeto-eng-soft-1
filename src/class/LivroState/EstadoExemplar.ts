import { Exemplar } from "../Livro/Exemplar";

export abstract class EstadoExemplar {
  protected exemplar: Exemplar;
  status: boolean = false;

  constructor(exemplar: Exemplar) {
    this.exemplar = exemplar;
  }

  abstract onDisponivel(): void;

  abstract onEmprestado(): void;
}
