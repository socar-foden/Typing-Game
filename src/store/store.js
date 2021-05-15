import { initialState } from "../constants/constants";

class Store {
  constructor() {
    this._state = initialState;
    this._observers = [];

    if (!Store._instance) {
      Store._instance = this;
    } else {
      return Store._instance;
    }
  }

  static getInstance() {
    if (!Store._instance) {
      Store._instance = new Store();
    }

    return this._instance;
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

  removeObserver(observer) {
    this._observers = this._observers.filter((item) => item !== observer);
  }

  notifyAll() {
    this._observers.forEach((observer) => {
      observer.update();
    });
  }
}

export default Store;
