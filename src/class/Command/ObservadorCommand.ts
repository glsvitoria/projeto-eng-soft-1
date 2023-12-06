import { Biblioteca } from "../Biblioteca/Biblioteca";
import { Command } from "./Command";

export class ObservadorCommand implements Command {
  execute(uArgs: string[]): void {
    if (uArgs.length < 3) {
      console.log("Insucesso! Argumentos faltando");
      return;
    }

    Biblioteca.getInstancia().observar(uArgs[1], uArgs[2]);
  }
}
