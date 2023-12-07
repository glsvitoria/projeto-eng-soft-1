import { Livro } from "../Livro/Livro";
import { Reserva } from "../Reserva/Reserva";
import { Usuario } from "../Usuario/Usuario";
import { ReservarStrategy } from "./ReservarStrategy";

export class ReservaAlunoGraduacao implements ReservarStrategy {
  reservar(usuario: Usuario, livro: Livro, data: Date): void {
    let mensagem = "";

    if (usuario.getReservas().length >= 3) {
      mensagem = "Insucesso! Usuário atingiu o número máximo de reservas.";
    } else if (usuario.hasReservaByIdLivro(livro.getCodigoIdentificacao())) {
      mensagem = "Insucesso! Usuário já possui reserva desse livro.";
    } else {
      mensagem = "Sucesso! Reserva realizada com sucesso.";

      const novaReserva = new Reserva(livro, usuario);

      livro.getReservas().push(novaReserva);

      usuario.getReservas().push(novaReserva);
      usuario.getAllReservas().push(novaReserva);

      if (livro.getReservas().length >= 2) {
        livro.notifyObservers();
      }
    }

    console.log(`Usuário: ${usuario.getNome()}`);
    console.log(`Título: ${livro.getTitulo()}`);
    console.log(`Mensagem: ${mensagem}`);
  }
}
