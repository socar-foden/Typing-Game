import "@testing-library/jest-dom";
import { getByTestId } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import Complete from "./Complete";
import Store from "../../store/store";

describe("[Complete]", () => {
  const screen = document.createElement("div");
  let complete;

  beforeEach(() => {
    complete = new Complete(new Store());
    complete.render(screen);
  });

  afterEach(() => {
    screen.innerHTML = "";
  });

  describe("[구성요소]", () => {
    it("축하 메세지, 점수, 평균 답변시간, 다시시작 버튼 영역이 존재한다.", () => {
      expect(getByTestId(screen, "success-message")).toBeTruthy();
      expect(getByTestId(screen, "score")).toBeTruthy();
      expect(getByTestId(screen, "avg-answer-time")).toBeTruthy();
      expect(getByTestId(screen, "restart-button")).toBeTruthy();
    });
  });

  describe("[기능]", () => {
    describe("restart 버튼을 클릭", () => {
      it("resetGame 함수가 호출된다.", () => {
        const mockCall = jest.spyOn(complete, "resetGame");
        userEvent.click(getByTestId(screen, "restart-button"));
        expect(mockCall).toBeCalled();
      });

      it("시작화면으로(hash: #/) 이동한다.", () => {
        expect(location.hash).toEqual("#/");
      });
    });
  });
});
