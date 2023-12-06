import { Exemplar } from "../Livro/Exemplar";
import { Emprestado } from "./Emprestado";
import { EstadoExemplar } from "./EstadoExemplar";

export class Disponivel extends EstadoExemplar {
  constructor(exemplar: Exemplar) {
    super(exemplar);
    this.status = true;
  }

  onDisponivel() {
    throw new Error("Exemplar já disponível");
  }

  onEmprestado() {
    this.exemplar.setEstado(new Emprestado(this.exemplar));
  }
}
