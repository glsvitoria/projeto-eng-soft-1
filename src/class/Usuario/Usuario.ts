import { DevolverStrategy } from "../DevolverStrategy/DevolverStrategy";
import { Emprestimo } from "../Emprestimo/Emprestimo";
import { EmprestimoStrategy } from "../EmprestimoStrategy/EmprestimoStrategy";
import { Livro } from "../Livro/Livro";
import { Observer } from "../NotificarObserver/Observer";
import { Reserva } from "../Reserva/Reserva";
import { ReservarStrategy } from "../ReservarStrategy/ReservarStrategy";

export abstract class Usuario implements Observer {
  id: string;
  nome: string;
  devedor: boolean;
  tempoDeEmprestimoDias: number = 0;

  qntNotificacoes: number;

  reservaStrategy: ReservarStrategy | undefined;
  devolverStrategy: DevolverStrategy | undefined;

  getDevolverStrategy(): DevolverStrategy | undefined {
    return this.devolverStrategy;
  }

  getDevedor(): boolean {
    return this.devedor;
  }

  setDevedor(devedor: boolean): void {
    this.devedor = devedor;
  }

  getEmprestimoStrategy(): ReservarStrategy | undefined {
    return this.reservaStrategy;
  }

  setEmprestimoStrategy(reservaStrategy: ReservarStrategy): void {
    this.reservaStrategy = reservaStrategy;
  }

  emprestimoStrategy: EmprestimoStrategy | undefined;

  reservas = new Array<Reserva>();
  allReservas = new Array<Reserva>();
  emprestimos = new Array<Emprestimo>();
  allEmprestimos = new Array<Emprestimo>();

  constructor(id: string, nome: string) {
    this.id = id;
    this.nome = nome;
    this.devedor = false;
    this.qntNotificacoes = 0;
  }

  update(): void {
    this.addQntNotificacoes();
  }

  addQntNotificacoes(): void {
    this.qntNotificacoes++;
  }

  getAllEmprestimos(): Array<Emprestimo> {
    return this.allEmprestimos;
  }

  getAllReservas(): Array<Reserva> {
    return this.allReservas;
  }

  getCodigoIdentificacao(): string {
    return this.id;
  }

  setCodigoIdentificacao(id: string): void {
    this.id = id;
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getEmprestimos(): Array<Emprestimo> {
    return this.emprestimos;
  }

  setEmprestimos(emprestimos: Array<Emprestimo>): void {
    this.emprestimos = emprestimos;
  }

  reservar(livro: Livro, data: string): void {
    this.reservaStrategy?.reservar(this, livro, data);
  }

  getReservaStrategy(): ReservarStrategy | undefined {
    return this.reservaStrategy;
  }

  setReservaStrategy(reservaStrategy: ReservarStrategy): void {
    this.reservaStrategy = reservaStrategy;
  }

  getReservas(): Array<Reserva> {
    return this.reservas;
  }

  setReservas(reservas: Array<Reserva>): void {
    this.reservas = reservas;
  }

  pegarEmprestado() {}

  consulta(): void {
    console.log(`Quantidade de notificações: ${this.qntNotificacoes}`);
  }

  encontrarEmprestimoPorIdLivro(idLivro: string): Emprestimo | undefined {
    return this.emprestimos.find(
      emprestimo => emprestimo.getLivro().getCodigoIdentificacao() === idLivro,
    );
  }

  hasEmprestimoPorIdLivro(idLivro: string): boolean {
    return this.emprestimos.some(
      emprestimo => emprestimo.getLivro().getCodigoIdentificacao() === idLivro,
    );
  }

  getTempoDeEmprestimoDias(): number {
    return this.tempoDeEmprestimoDias;
  }

  consultar() {
    console.log("Usuário - Informações:");
    console.log(`Nome: ${this.nome}`);

    console.log("Empréstimos - Informações:");
    this.emprestimos.forEach(emprestimo => {
      console.log(`Livro: ${emprestimo.getLivro().getTitulo()}`);
      console.log(`Data de empréstimo: ${emprestimo.getDataEmprestimo()}`);
      console.log(`Data de devolução: ${emprestimo.getDataDevolucao()}`);
    });

    console.log("Reservas - Informações:");
    this.reservas.forEach(reserva => {
      console.log(`Livro: ${reserva.getLivro().getTitulo()}`);
      console.log(`Data de reserva: ${reserva.getDataReserva()}`);
    });
  }

  hasReservaByIdLivro(idLivro: string): boolean {
    return this.reservas.some(
      reserva => reserva.getLivro().getCodigoIdentificacao() === idLivro,
    );
  }

  removerReservaPorIdLivro(idLivro: string): void {
    this.reservas = this.reservas.filter(
      reserva => reserva.getLivro().getCodigoIdentificacao() !== idLivro,
    );
  }
}
