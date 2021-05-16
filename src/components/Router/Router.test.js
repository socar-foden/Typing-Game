import Complete from "../../pages/Complete/Complete";
import Store from "../../store/store";
import Router from "./Router";

describe("[Router]", () => {
  const root = document.createElement("div");
  const router = new Router(root);
  const complete = new Complete(new Store());

  router.addPage({ path: "/complete", view: complete });

  describe("[기능]", () => {
    it("특정 path에 맞는 view의 render 함수가 호출된다.", () => {
      const mockCall = jest.spyOn(complete, "render");
      router.pushPath("/complete");
      expect(mockCall).toHaveBeenCalled();
    });
  });
});
