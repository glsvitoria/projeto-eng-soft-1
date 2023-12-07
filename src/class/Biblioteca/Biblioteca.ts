import { Exemplar } from "../Livro/Exemplar";
import { Livro } from "../Livro/Livro";
import { AlunoGraduacao } from "../Usuario/AlunoGraduacao";
import { AlunoPosGraduacao } from "../Usuario/AlunoPosGraduacao";
import { Professor } from "../Usuario/Professor";
import { Usuario } from "../Usuario/Usuario";

export class Biblioteca {
  static instance: Biblioteca;

  usuarios: Usuario[] = [];
  livros: Livro[] = [];

  private constructor() {
    this.adicionarDados();
  }

  static getInstancia(): Biblioteca {
    if (!Biblioteca.instance) {
      Biblioteca.instance = new Biblioteca();
    }
    return Biblioteca.instance;
  }

  reservar(idUsuario: string, idLivro: string) {
    const reservaUsuario = this.encontrarUsuarioPorId(idUsuario);
    if (!reservaUsuario) {
      console.log("Insucesso! Usuário não encontrado");
      return;
    }
    const reservaLivro = this.encontrarLivroPorId(idLivro);
    if (!reservaLivro) {
      console.log("Insucesso! Livro não encontrado");
      return;
    }

    if (reservaUsuario && reservaLivro) {
      reservaUsuario
        .getReservaStrategy()
        ?.reservar(reservaUsuario, reservaLivro, new Date());
    }
  }

  emprestar(idUsuario: string, idLivro: string) {
    const devolverEmprestimoUsuario = this.encontrarUsuarioPorId(idUsuario);
    if (!devolverEmprestimoUsuario) {
      console.log("Insucesso! Usuário não encontrado");
      return;
    }
    const devolverEmprestimoLivro = this.encontrarLivroPorId(idLivro);
    if (!devolverEmprestimoLivro) {
      console.log("Insucesso! Livro não encontrado");
      return;
    }

    devolverEmprestimoUsuario
      .getDevolverStrategy()
      ?.devolver(devolverEmprestimoUsuario, devolverEmprestimoLivro);
  }

  devolver(idUsuario: string, idLivro: string) {
    const devolverEmprestimoUsuario = this.encontrarUsuarioPorId(idUsuario);

    if (!devolverEmprestimoUsuario) {
      console.log("Insucesso! Usuário não encontrado");
      return;
    }

    const devolverEmprestimoLivro = this.encontrarLivroPorId(idLivro);
    if (!devolverEmprestimoLivro) {
      console.log("Insucesso! Livro não encontrado");
      return;
    }

    devolverEmprestimoUsuario
      .getDevolverStrategy()
      ?.devolver(devolverEmprestimoUsuario, devolverEmprestimoLivro);
  }

  observar(idUsuario: string, idLivro: string) {
    const observarUsuario = this.encontrarUsuarioPorId(idUsuario);
    if (!observarUsuario) {
      console.log("Insucesso! Usuário não encontrado");
      return;
    }
    const observarLivro = this.encontrarLivroPorId(idLivro);
    if (!observarLivro) {
      console.log("Insucesso! Livro não encontrado");
      return;
    }

    if (observarUsuario && observarLivro) {
      observarLivro.registerObserver(observarUsuario);
      console.log("Sucesso!");
    }
  }

  consultarLivro(idLivro: string) {
    const livro = this.encontrarLivroPorId(idLivro);
    if (!livro) {
      console.log("Insucesso! Livro não encontrado");
      return;
    }

    const qntReservas = livro.getReservas().length;

    console.log(`Título: ${livro.getTitulo()}`);
    console.log(`Reservas: ${qntReservas}`);

    if (qntReservas > 0) {
      console.log("Reservas - Informações");
      livro.getReservas().forEach(reserva => {
        console.log(reserva.getUsuario().getNome());
      });
    }

    const qntExemplar = livro.getExemplares().length;
    if (qntExemplar > 0) {
      console.log("Exemplares - Informações");
      livro.getExemplares().forEach(exemplar => {
        console.log(`Código: ${exemplar.getCodigoExemplar()}`);
        console.log(`Status: ${exemplar.getStatusString()}`);
        if (!exemplar.getEstado().status) {
          console.log(
            `Usuário: ${exemplar
              .getUltimoEmprestimo()
              ?.getUsuario()
              .getNome()}`,
          );
          console.log(
            `Data de Empréstimo: ${exemplar
              .getUltimoEmprestimo()
              ?.getDataEmprestimo()}`,
          );
          console.log(
            `Data de Devolução: ${exemplar
              .getUltimoEmprestimo()
              ?.getDataDevolucao()}`,
          );
        }
      });
    }
  }

  consultarUsuario(idUsuario: string): void {
    const usuario = this.encontrarUsuarioPorId(idUsuario);
    if (!usuario) {
      console.log("Insucesso! Usuário não encontrado");
      return;
    }

    usuario.consultar();
  }

  private encontrarUsuarioPorId(id: string): Usuario | null {
    const usuarioFind = this.usuarios.find(usuario => usuario.id === id);

    if (usuarioFind) {
      return usuarioFind;
    }

    return null;
  }

  private encontrarLivroPorId(id: string): Livro | null {
    const livroFind = this.livros.find(livro => livro.id === id);

    if (livroFind) {
      return livroFind;
    }

    return null;
  }

  consultaProfessor(id: string) {
    const usuario = this.encontrarUsuarioPorId(id);
    if (usuario) {
      return usuario.consulta();
    }

    console.log("Insucesso! Usuário não encontrado");

    return null;
  }

  private adicionarDados() {
    this.usuarios.push(new AlunoGraduacao("123", "Guilherme Vitória"));
    this.usuarios.push(new AlunoPosGraduacao("456", "Felipe Chinês"));
    this.usuarios.push(new AlunoGraduacao("789", "Ícaro Cedraz"));
    this.usuarios.push(new Professor("100", "José Roberto"));

    this.livros.push(
      new Livro(
        "100",
        "Fogo e Sangue",
        "Suma",
        "George R. R. Martin",
        "1ª",
        2018,
      ),
    );

    this.livros.push(
      new Livro(
        "101",
        "Harry Potter e a Pedra Filosofal",
        "Rocco",
        "J. K. Rowling",
        "1ª",
        2000,
      ),
    );

    this.livros.push(
      new Livro(
        "200",
        "O Hobbit",
        "HarperCollins",
        "J. R. R. Tolkien",
        "1ª",
        2013,
      ),
    );

    this.livros.push(
      new Livro(
        "201",
        "Percy Jackson e o Ladrão de Raios",
        "Intrínseca",
        "Rick Riordan",
        "1ª",
        2010,
      ),
    );

    this.livros.push(
      new Livro(
        "300",
        "O Assassino do Expresso do Oriente",
        "HarperCollins",
        "Agatha Christie",
        "1ª",
        2014,
      ),
    );

    this.livros.push(
      new Livro(
        "301",
        "Harry Potter e as Relíquias da Morte",
        "Rocco",
        "J. K. Rowling",
        "1ª",
        2007,
      ),
    );

    this.livros.push(
      new Livro("400", "Duna", "Aleph", "Frank Herbert", "1ª", 2010),
    );

    this.livros.push(
      new Livro(
        "401",
        "O Senhor dos Anéis",
        "Martins",
        "J. R. R. Tolkien",
        "1ª",
        2000,
      ),
    );

    this.livros[0].adicionarExemplar(new Exemplar(this.livros[0], "01"));
    this.livros[0].adicionarExemplar(new Exemplar(this.livros[0], "02"));
    this.livros[1].adicionarExemplar(new Exemplar(this.livros[1], "03"));
    this.livros[2].adicionarExemplar(new Exemplar(this.livros[2], "04"));
    this.livros[3].adicionarExemplar(new Exemplar(this.livros[3], "05"));
    this.livros[4].adicionarExemplar(new Exemplar(this.livros[4], "06"));
    this.livros[4].adicionarExemplar(new Exemplar(this.livros[4], "07"));
    this.livros[6].adicionarExemplar(new Exemplar(this.livros[6], "08"));
    this.livros[6].adicionarExemplar(new Exemplar(this.livros[6], "09"));
  }
}
