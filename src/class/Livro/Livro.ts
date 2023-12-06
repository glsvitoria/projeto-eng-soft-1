import { Observer } from "../NotificarObserver/Observer";
import { Subject } from "../NotificarObserver/Subject";
import { Reserva } from "../Reserva/Reserva";
import { Exemplar } from "./Exemplar";

export class Livro implements Subject {
  public id: string;
  public titulo: string;
  editora: string;
  autores: string;
  edicao: string;
  anoDaPublicacao: number;

  exemplares = new Array<Exemplar>();
  reservas = new Array<Reserva>();

  constructor(
    id: string,
    titulo: string,
    editora: string,
    autores: string,
    edicao: string,
    anoDaPublicacao: number,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.editora = editora;
    this.autores = autores;
    this.edicao = edicao;
    this.anoDaPublicacao = anoDaPublicacao;
  }

  getCodigoIdentificacao(): string {
    return this.id;
  }

  setCodigoIdentificacao(id: string): void {
    this.id = id;
  }

  getTitulo(): string {
    return this.titulo;
  }

  setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  getEditora(): string {
    return this.editora;
  }

  setEditora(editora: string): void {
    this.editora = editora;
  }

  getAutores(): string {
    return this.autores;
  }

  setAutores(autores: string): void {
    this.autores = autores;
  }

  getReservas(): Array<Reserva> {
    return this.reservas;
  }

  setReservas(reservas: Array<Reserva>): void {
    this.reservas = reservas;
  }

  getEdicao(): string {
    return this.edicao;
  }

  setEdicao(edicao: string): void {
    this.edicao = edicao;
  }

  getAnoDaPublicacao(): number {
    return this.anoDaPublicacao;
  }

  setAnoDaPublicacao(anoDaPublicacao: number): void {
    this.anoDaPublicacao = anoDaPublicacao;
  }

  getExemplares(): Array<Exemplar> {
    return this.exemplares;
  }

  setExemplares(exemplares: Array<Exemplar>): void {
    this.exemplares = exemplares;
  }

  addReserva(reserva: Reserva): void {
    this.reservas.push(reserva);
    if (this.reservas.length > 2) {
      this.notifyObservers();
    }
  }

  observadores = new Array<Observer>();

  registerObserver(observer: Observer): void {
    this.observadores.push(observer);
  }

  notifyObservers(): void {
    for (const observer of this.observadores) {
      observer.update();
    }
  }

  encontrarReservaPorIdUsuario(idUsuario: string): Reserva | undefined {
    return this.reservas.find(
      reserva => reserva.getUsuario().getCodigoIdentificacao() === idUsuario,
    );
  }

  adicionarExemplar(exemplar: Exemplar): void {
    this.exemplares.push(exemplar);
  }

  isAvailableExemplar(id: string): boolean {
    const exemplar = this.exemplares.find(
      exemplar => exemplar.getCodigoExemplar() === id,
    );
    if (exemplar) {
      return exemplar.getEstado().status;
    }
    return false;
  }

  countAvailableExemplar(id: string): number {
    let soma: number = 0;
    for (const exemplar of this.exemplares) {
      if (exemplar.getEstado()) {
        soma++;
      }
    }
    return soma;
  }

  getAvaiableExemplarByLivroId(id: string): Exemplar | undefined {
    return this.exemplares.find(
      exemplar => exemplar.getLivro().getCodigoIdentificacao() === id,
    );
  }

  getExemplarByIdUsuarioIdLivro(
    idUsuario: string,
    idLivro: string,
  ): Exemplar | undefined {
    const exemplar = this.exemplares.find(
      exemplar =>
        exemplar.getUltimoEmprestimo()?.getUsuario().getCodigoIdentificacao() === idUsuario &&
        exemplar.getUltimoEmprestimo()?.getLivro().getCodigoIdentificacao() ===
          idLivro,
    );
    return exemplar;
  }

  removeReservaByIdUsuario(idUsuario: string): void {
    const reserva = this.encontrarReservaPorIdUsuario(idUsuario);
    if (reserva) {
      const index = this.reservas.indexOf(reserva);
      this.reservas.splice(index, 1);
    }
  }
}
