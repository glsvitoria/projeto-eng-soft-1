import { Biblioteca } from "../Biblioteca/Biblioteca";
import { Command } from "./Command";

export class ConsultaLivroCommand implements Command {
  execute(uArgs: string[]): void {
    if (uArgs.length < 2) {
      console.log("Insucesso! Argumentos faltando");
      return;
    }

    Biblioteca.getInstancia().consultarLivro(uArgs[1]);
  }
}
