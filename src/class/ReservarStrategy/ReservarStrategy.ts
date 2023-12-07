import { Livro } from "../Livro/Livro";
import { Usuario } from "../Usuario/Usuario";

export interface ReservarStrategy {
  reservar(usuario: Usuario, reservaLivro: Livro, data: Date): void;
}
