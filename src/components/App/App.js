import Complete from "../../pages/Complete/Complete";
import Main from "../../pages/Main/Main";
import Store from "../../store/store";
import Router from "../Router/Router";
import "./App.scss";

class App {
  constructor($root) {
    this.$root = $root;

    this._store = new Store();
    this._main = new Main(this._store);
    this._complete = new Complete(this._store);

    this._store.addObserver(this._main);
    this._router = new Router(this.$root);
  }

  init() {
    this._router.addPage({ path: "/", view: this._main });
    this._router.addPage({ path: "/complete", view: this._complete });
    this._router.init();
  }
}

export default App;
