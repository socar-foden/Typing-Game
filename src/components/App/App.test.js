import App from "./App";

describe("[App]", () => {
  const root = document.createElement("div");
  const app = new App(root);

  describe("[기능]", () => {
    it("init 함수 호출시, router의 init 함수를 호출", () => {
      const mockCall = jest.spyOn(app._router, "init");
      app.init();
      expect(mockCall).toBeCalled();
    });
  });
});
