import Main from "../../pages/Main/Main";
import Store from "../../store/store";

class App {
  constructor() {
    this._main = new Main();
    this._store = Store.getInstance();

    this._store.addObserver(this._main);
  }

  init($el) {
    this._main.render($el);
  }
}

export default App;
