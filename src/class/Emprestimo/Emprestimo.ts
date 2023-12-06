import { Livro } from '../Livro/Livro'
import { Usuario } from '../Usuario/Usuario'

export class Emprestimo {
	private usuario: Usuario
	private livro: Livro
	private dataEmprestimo: Date
	private dataDevolucao: Date
	private isFinalizado = false

	constructor(usuario: Usuario, livro: Livro, limitDate: Date) {
		this.usuario = usuario
		this.livro = livro
		this.dataEmprestimo = new Date()
		this.dataDevolucao = new Date(limitDate)
	}

	setFinalizado(): void {
		this.isFinalizado = true
	}

	getStatus(): boolean {
		return this.isFinalizado
	}

	getDataEmprestimo(): Date {
		return this.dataEmprestimo
	}

	getDataDevolucao(): Date {
		return this.dataDevolucao
	}

	getLivro(): Livro {
		return this.livro
	}

	getUsuario(): Usuario {
		return this.usuario
	}

	setLivro(livro: Livro): void {
		this.livro = livro
	}
}
