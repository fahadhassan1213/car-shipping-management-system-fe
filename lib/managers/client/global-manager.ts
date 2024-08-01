import { makeAutoObservable } from "mobx";

export class GlobalManager {
  constructor() {
    makeAutoObservable(this);
  }
}
