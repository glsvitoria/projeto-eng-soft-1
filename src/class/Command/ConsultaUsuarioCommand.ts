import { Biblioteca } from "../Biblioteca/Biblioteca";
import { Command } from "./Command";

export class ConsultaUsuarioCommand implements Command {
  execute(uArgs: string[]): void {
    if (uArgs.length < 2) {
      console.log("Insucesso! Argumentos faltando");
      return;
    }

    Biblioteca.getInstancia().consultarUsuario(uArgs[1]);
  }
}
