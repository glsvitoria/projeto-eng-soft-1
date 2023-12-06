import { Exemplar } from "../Livro/Exemplar";
import { Disponivel } from "./Disponivel";
import { EstadoExemplar } from "./EstadoExemplar";

export class Emprestado extends EstadoExemplar {
  constructor(exemplar: Exemplar) {
    super(exemplar);
    this.status = false;
  }

  onDisponivel() {
    this.exemplar.setEstado(new Disponivel(this.exemplar));
  }

  onEmprestado() {}
}
