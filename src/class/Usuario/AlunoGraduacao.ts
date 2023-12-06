import { Devolver } from "../DevolverStrategy/Devolver";
import { EmprestimoAlunoGraduacao } from "../EmprestimoStrategy/EmprestimoAlunoGraduacao";
import { Livro } from "../Livro/Livro";
import { ReservaAlunoGraduacao } from "../ReservarStrategy/ReservaAlunoGraduacao";
import { Usuario } from "./Usuario";

export class AlunoGraduacao extends Usuario {
  static limiteEmprestimoAberto: number = 3;

  constructor(codigoIdentificacao: string, nome: string) {
    super(codigoIdentificacao, nome);
    this.reservaStrategy = new ReservaAlunoGraduacao();
    this.emprestimoStrategy = new EmprestimoAlunoGraduacao();
    this.devolverStrategy = new Devolver();
    this.tempoDeEmprestimoDias = 3;
  }

  reservar(livro: Livro, data: string): void {
    this.reservaStrategy?.reservar(this, livro, data);
  }
}
