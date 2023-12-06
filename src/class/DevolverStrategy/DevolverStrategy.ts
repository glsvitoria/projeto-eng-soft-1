import { Livro } from "../Livro/Livro";
import { Usuario } from "../Usuario/Usuario";

export interface DevolverStrategy {
  devolver(usuario: Usuario, emprestimoLivro: Livro): void
}