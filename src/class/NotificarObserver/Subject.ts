import { Observer } from "./Observer";

export interface Subject {
  registerObserver(observer: Observer): void;

  notifyObservers(): void;
}
