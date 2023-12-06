import { Devolver } from "../DevolverStrategy/Devolver";
import { EmprestimoProfessor } from "../EmprestimoStrategy/EmprestimoProfessor";
import { Livro } from "../Livro/Livro";
import { ReservaProfessor } from "../ReservarStrategy/ReservaProfessor";
import { Usuario } from "./Usuario";

export class Professor extends Usuario {
  constructor(codigoIdentificacao: string, nome: string) {
    super(codigoIdentificacao, nome);
    this.qntNotificacoes = 0;
    this.reservaStrategy = new ReservaProfessor();
    this.emprestimoStrategy = new EmprestimoProfessor();
    this.devolverStrategy = new Devolver();
    this.tempoDeEmprestimoDias = 7;
  }

  getQntNotificacoes(): number {
    return this.qntNotificacoes;
  }

  setQntNotificacoes(qntNotificacoes: number): void {
    this.qntNotificacoes = qntNotificacoes;
  }

  reservar(livro: Livro, data: string) {
    this.reservaStrategy?.reservar(this, livro, data);
  }
}
