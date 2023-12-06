import { Livro } from "../Livro/Livro";
import { Disponivel } from "../LivroState/Disponivel";
import { Usuario } from "../Usuario/Usuario";
import { DevolverStrategy } from "./DevolverStrategy";

export class Devolver implements DevolverStrategy {
  devolver(usuario: Usuario, emprestimoLivro: Livro) {
    const regra1 = usuario.hasEmprestimoPorIdLivro(
      emprestimoLivro.getCodigoIdentificacao(),
    );
    let mensagem = "";

    if (regra1) {
      mensagem = "Sucesso! Livro devolvido";

      const devEmprestimo = usuario.encontrarEmprestimoPorIdLivro(
        emprestimoLivro.getCodigoIdentificacao(),
      );
      devEmprestimo?.setFinalizado();
      usuario.getEmprestimos().push(devEmprestimo!);

      const devExemplar = emprestimoLivro.getExemplarByIdUsuarioIdLivro(
        usuario.getCodigoIdentificacao(),
        emprestimoLivro.getCodigoIdentificacao(),
      );
      devExemplar?.setEstado(new Disponivel(devExemplar));
      devExemplar?.setUltimoEmprestimo(null);
    } else {
      mensagem = `Insucesso! Não existe empréstimo do livro ${emprestimoLivro.getCodigoIdentificacao()} para o usuário ${usuario.getCodigoIdentificacao()}`;
    }

    console.log(`Usuário: ${usuario.getNome()}`);
    console.log(`Título: ${emprestimoLivro.getTitulo()}`);
    console.log(`Mensagem: ${mensagem}`);
  }
}
