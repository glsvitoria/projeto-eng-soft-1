import { Livro } from '../Livro/Livro'
import { Usuario } from '../Usuario/Usuario'

export interface EmprestimoStrategy {
	emprestar(usuario: Usuario, emprestimoLivro: Livro): void
}
