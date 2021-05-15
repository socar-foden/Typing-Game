import Main from "../../pages/Main/Main";

class App {
  constructor() {
    this.main = new Main();
  }

  init() {
    return this.main.render();
  }
}

export default App;
