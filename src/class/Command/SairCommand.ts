import { Command } from "./Command";

export class SairCommand implements Command {
  execute(uArgs: string[]): void {
    console.log("Saindo...");
    process.exit(1);
  }
}
