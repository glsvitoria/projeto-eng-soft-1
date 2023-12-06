import { addDays } from "date-fns";
import { Livro } from "../Livro/Livro";
import { AlunoGraduacao } from "../Usuario/AlunoGraduacao";
import { Usuario } from "../Usuario/Usuario";
import { EmprestimoStrategy } from "./EmprestimoStrategy";
import { Emprestimo } from "../Emprestimo/Emprestimo";
import { Emprestado } from "../LivroState/Emprestado";

export class EmprestimoAlunoGraduacao implements EmprestimoStrategy {
  emprestar(usuario: Usuario, livro: Livro): void {
    let mensagem = "";

    const regra1 = livro.isAvailableExemplar(livro.getCodigoIdentificacao());
    if (!regra1) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Não há disponibilidade de exemplares desse livro no momento.";
    }

    const regra2 = !usuario.getDevedor();
    if (!regra2) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Usuário está com pendências de devolução.";
    }

    const regra3 = !(
      usuario.getEmprestimos().length >= AlunoGraduacao.limiteEmprestimoAberto
    );
    if (!regra3) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Usuário atingiu o limite de empréstimos abertos.";
    }

    const regra4 =
      livro.getReservas().length <
      livro.countAvailableExemplar(livro.getCodigoIdentificacao())
        ? true
        : livro.encontrarReservaPorIdUsuario(
            usuario.getCodigoIdentificacao(),
          ) != null;
    if (!regra4) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Quantidade de reservas maior do que a quantidade de exemplares disponíveis!";
    }

    const regra5 =
      livro.getReservas().length >=
      livro.countAvailableExemplar(livro.getCodigoIdentificacao())
        ? livro.encontrarReservaPorIdUsuario(
            usuario.getCodigoIdentificacao(),
          ) != null
        : true;
    if (!regra5) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Usuário já possui reserva desse livro.";
    }

    const regra6 = usuario.hasEmprestimoPorIdLivro(
      livro.getCodigoIdentificacao(),
    );
    if (!regra6) {
      mensagem =
        mensagem != null
          ? mensagem
          : "Insucesso! Usuário já possui empréstimo desse livro.";
    }

    if (regra1 && regra2 && regra3 && regra4 && regra5 && regra6) {
      // Caso existia reserva, remover reserva
      usuario.removerReservaPorIdLivro(livro.getCodigoIdentificacao());
      livro.removeReservaByIdUsuario(usuario.getCodigoIdentificacao());

      // Criar novo emprestimo com data de devolução
      const dataDevolver = addDays(
        new Date(),
        usuario.getTempoDeEmprestimoDias(),
      );
      const novoEmprestimo = new Emprestimo(usuario, livro, dataDevolver);

      // Atualizar informação do exemplar para emprestado e atualizar ultimo emprestimo
      const selectExemplar = livro.getAvaiableExemplarByLivroId(
        livro.getCodigoIdentificacao(),
      );
      selectExemplar?.setEstado(new Emprestado(selectExemplar));
      selectExemplar?.setUltimoEmprestimo(novoEmprestimo);

      // Adicionar emprestimo na lista de emprestimos
      usuario.getEmprestimos().push(novoEmprestimo);
      usuario.getAllEmprestimos().push(novoEmprestimo);
      mensagem = "Sucesso! Empréstimo realizado com sucesso.";
    }

    console.log(`Usuário: ${usuario.getNome()}`);
    console.log(`Título: ${livro.getTitulo()}`);
    console.log(`Mensagem: ${mensagem}`);
  }
}
