import { Devolver } from "../DevolverStrategy/Devolver";
import { EmprestimoAlunoPosGraduacao } from "../EmprestimoStrategy/EmprestimoAlunoPosGraduacao";
import { Livro } from "../Livro/Livro";
import { ReservaAlunoPosGraduacao } from "../ReservarStrategy/ReservaAlunoPosGraduacao";
import { Usuario } from "./Usuario";

export class AlunoPosGraduacao extends Usuario {
  static limiteEmprestimoAberto: number = 4;

  constructor(codigoIdentificacao: string, nome: string) {
    super(codigoIdentificacao, nome);
    this.reservaStrategy = new ReservaAlunoPosGraduacao();
    this.emprestimoStrategy = new EmprestimoAlunoPosGraduacao();
    this.devolverStrategy = new Devolver();
    this.tempoDeEmprestimoDias = 4;
  }
  reservar(livro: Livro, data: string) {
    this.reservaStrategy?.reservar(this, livro, data);
  }
}
