import { Biblioteca } from "../Biblioteca/Biblioteca";
import { Command } from "./Command";

export class EmprestarCommand implements Command {
  execute(uArgs: string[]): void {
    if (uArgs.length < 3) {
      console.log("Insucesso! Argumentos faltando");
      return;
    }

    Biblioteca.getInstancia().emprestar(uArgs[1], uArgs[2]);
  }
}
