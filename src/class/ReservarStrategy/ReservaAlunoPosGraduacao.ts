import { Livro } from "../Livro/Livro";
import { Reserva } from "../Reserva/Reserva";
import { Usuario } from "../Usuario/Usuario";
import { ReservarStrategy } from "./ReservarStrategy";

export class ReservaAlunoPosGraduacao implements ReservarStrategy {
  reservar(usuario: Usuario, reservaLivro: Livro, data: string): void {
    let mensagem = "";

    if (usuario.getReservas().length >= 3) {
      mensagem = "Insucesso! Usuário atingiu o número máximo de reservas.";
    } else if (
      usuario.hasReservaByIdLivro(reservaLivro.getCodigoIdentificacao())
    ) {
      mensagem = "Insucesso! Usuário já possui reserva desse livro.";
    } else {
      mensagem = "Sucesso! Reserva realizada com sucesso.";

      const novaReserva = new Reserva(reservaLivro, usuario);

      reservaLivro.getReservas().push(novaReserva);

      usuario.getReservas().push(novaReserva);
      usuario.getAllReservas().push(novaReserva);

      if (reservaLivro.getReservas().length >= 2) {
        reservaLivro.notifyObservers();
      }
    }

    console.log(`Usuário: ${usuario.getNome()}`);
    console.log(`Título: ${reservaLivro.getTitulo()}`);
    console.log(`Mensagem: ${mensagem}`);
  }
}
