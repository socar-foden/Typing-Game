import App from "./App";

describe("[App]", () => {
  const app = new App();
  const root = document.createElement("div");

  describe("[기능]", () => {
    it("init 함수 호출시, main의 렌더를 호출", () => {
      const mockCall = jest.spyOn(app._main, "render");
      app.init(root);
      expect(mockCall).toBeCalled();
    });
  });
});
