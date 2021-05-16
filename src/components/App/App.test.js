import App from "./App";

describe("[App]", () => {
  const root = document.createElement("div");
  let app;

  beforeEach(() => {
    app = new App(root);
    // * for fetch response null at jest
    app._main.setQuestion = () => {}; // * for fetch response null at jest
  });

  describe("[기능]", () => {
    it("init 함수 호출시, router의 init 함수를 호출", () => {
      const mockCall = jest.spyOn(app._router, "init");
      app.init();
      expect(mockCall).toBeCalled();
    });
  });
});
