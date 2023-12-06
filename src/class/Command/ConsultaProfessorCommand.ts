import { Biblioteca } from "../Biblioteca/Biblioteca";
import { Command } from "./Command";

export class ConsultaProfessorCommand implements Command {
  execute(uArgs: string[]): void {
      if (uArgs.length < 2) {
        console.log("Insucesso! Argumentos faltando");
        return;
      }

      Biblioteca.getInstancia().consultaProfessor(uArgs[1]);
  }
}