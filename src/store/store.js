import { initialState } from "../constants/constants";

class Store {
  constructor() {
    this._state = initialState;
    this._observers = [];
  }

  setState(state) {
    this._state = { ...this._state, ...state };
    this.notifyAll();
  }

  getState() {
    return this._state;
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  notifyAll() {
    this._observers.forEach((observer) => {
      observer.update();
    });
  }
}

export default Store;
