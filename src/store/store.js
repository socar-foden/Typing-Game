import { READY } from "../constants/constants";

class Store {
  constructor() {
    this._state = {
      questions: [
        "사과",
        "기차",
        "원숭이",
        "훈민정음",
        "메시",
        "까마귀",
        "소원",
        "아프리카",
        "대한민국",
      ],
      numberOfAnswer: 10,
      totalTime: 0,
      loopTime: 10,
      status: READY,
    };
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
