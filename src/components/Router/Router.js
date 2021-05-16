class Router {
  constructor($root) {
    this.$root = $root;
    this._pages = [];

    location.hash = "/";
    this.onHashChange();
  }

  addPage({ path, view }) {
    this._pages.push({ path, view });
  }

  getPages() {
    return this._pages;
  }

  onHashChange() {
    window.onhashchange = () => this.init();
  }

  pushPath(nextPath) {
    const page = this.findPage(nextPath);
    page.view.render(this.$root);
  }

  init() {
    this.$root.innerHTML = "";
    const currentPath = location.hash.split("#")[1];
    const page = this.findPage(currentPath);
    page.view.render(this.$root);
  }

  findPage(targetPath) {
    return this._pages.find(({ path }) => path === targetPath);
  }
}

export default Router;
