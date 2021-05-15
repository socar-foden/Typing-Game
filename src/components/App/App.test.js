import App from "./App";

describe("[App]", () => {
  const app = new App();

  describe("[기능]", () => {
    it("init 함수 호출시, main의 렌더를 호출", () => {
      const mockCall = jest.spyOn(app.main, "render");
      app.init();
      expect(mockCall).toBeCalled();
    });
  });
});
