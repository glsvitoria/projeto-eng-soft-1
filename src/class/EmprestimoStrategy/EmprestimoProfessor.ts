import { addDays } from "date-fns";
import { Livro } from "../Livro/Livro";
import { Usuario } from "../Usuario/Usuario";
import { EmprestimoStrategy } from "./EmprestimoStrategy";
import { Emprestimo } from "../Emprestimo/Emprestimo";
import { Emprestado } from "../LivroState/Emprestado";

export class EmprestimoProfessor implements EmprestimoStrategy {
  emprestar(usuario: Usuario, livro: Livro): void {
    let mensagem = null;

    let regra1: boolean = livro.isAvailableExemplar(
      livro.getCodigoIdentificacao(),
    );
    if (!regra1) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Não há disponibilidade de exemplares desse livro no momento.";
    }

    let regra2: boolean = !usuario.getDevedor();
    if (!regra2) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Usuário está com pendências de devolução.";
    }

    if (regra1 && regra2) {
      // Remover reserva do livro, caso exista
      usuario.removerReservaPorIdLivro(livro.getCodigoIdentificacao());
      livro.removeReservaByIdUsuario(usuario.getCodigoIdentificacao());

      // Criar empréstimo
      const dataDevolver = addDays(
        new Date(),
        usuario.getTempoDeEmprestimoDias(),
      );
      const novoEmprestimo = new Emprestimo(usuario, livro, dataDevolver);

      // Atualizar informação do exemplar emprestado e atualizar ultimo emprestimo do livro
      const exemplar = livro.getExemplarByIdUsuarioIdLivro(
        usuario.getCodigoIdentificacao(),
        livro.getCodigoIdentificacao(),
      );
      exemplar?.setEstado(new Emprestado(exemplar));
      exemplar?.setUltimoEmprestimo(novoEmprestimo);

      // Adicionar emprestimo na lista de emprestimos do usuario
      usuario.getEmprestimos().push(novoEmprestimo);
      usuario.getAllEmprestimos().push(novoEmprestimo);
      mensagem = "Sucesso! Empréstimo realizado com sucesso.";
    }

    console.log(`Usuário: ${usuario.getNome()}`);
    console.log(`Livro: ${livro.getTitulo()}`);
    console.log(`Mensagem: ${mensagem}`);
  }
}
