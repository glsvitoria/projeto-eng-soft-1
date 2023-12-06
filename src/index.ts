import readline from "readline";
import { Invoker } from "./class/Command/Invoker";
import { Biblioteca } from "./class/Biblioteca/Biblioteca";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", input => {
  const myInvoker = new Invoker();

  const userArgs = input.split(" ");
  myInvoker.service(userArgs);
});
