import { ConsultaLivroCommand } from "./ConsultaLivroCommand";
import { ConsultaProfessorCommand } from "./ConsultaProfessorCommand";
import { ConsultaUsuarioCommand } from "./ConsultaUsuarioCommand";
import { DevolverCommand } from "./DevolverCommand";
import { EmprestarCommand } from "./EmprestarCommand";
import { ObservadorCommand } from "./ObservadorCommand";
import { ReservarCommand } from "./ReservarCommando";
import { SairCommand } from "./SairCommand";

export class Invoker {
  private initCommands(userArgs: string[]): void {
    const command = userArgs[0];

    switch (command) {
      case "dev":
        new DevolverCommand().execute(userArgs);
        break;
      case "emp":
        new EmprestarCommand().execute(userArgs);
        break;
      case "res":
        new ReservarCommand().execute(userArgs);
        break;
      case "obs":
        new ObservadorCommand().execute(userArgs);
        break;
      case "liv":
        new ConsultaLivroCommand().execute(userArgs);
        break;
      case "usu":
        new ConsultaUsuarioCommand().execute(userArgs);
        break;
      case "ntf":
        new ConsultaProfessorCommand().execute(userArgs);
        break;
      case "sai":
        new SairCommand().execute(userArgs);
        break;
      default:
        console.log("Insucesso! Comando inválido!");
        break;
    }
  }

  public service(userArgs: string[]): void {
    if (userArgs.length === 0) {
      console.log("Insucesso! Comando inválido!");
      return;
    }

    this.initCommands(userArgs);
    return;
  }
}
