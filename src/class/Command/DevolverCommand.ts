import { Biblioteca } from "../Biblioteca/Biblioteca";
import { Command } from "./Command";

export class DevolverCommand implements Command {
  execute(uArgs: string[]): void {
    if (uArgs.length < 3) {
      console.log("Insucesso! Argumentos faltando");
      return;
    }

    Biblioteca.getInstancia().devolver(uArgs[1], uArgs[2]);
  }
}
