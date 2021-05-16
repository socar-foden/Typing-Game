/* eslint-disable no-unused-vars */

class Page {
  constructor(store) {
    this._store = store;
    this.$container = document.createElement("div");
    this.addEventListener();
  }

  render($el) {
    this.setUp();
    $el.append(this.$container);
  }

  addEventListener() {
    throw Error("addEventListener is not implemented.");
  }

  setUp() {
    throw Error("setUp is not implemented.");
  }
}

export default Page;
