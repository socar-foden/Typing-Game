import "@testing-library/jest-dom";
import { fireEvent, getByTestId } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import Main from "./Main";
import { enterKey, initialState } from "../../constants/constants";

const { questions, loopTime, numberOfAnswer } = initialState;

describe("[Main]", () => {
  const screen = document.createElement("div");
  let main;

  beforeEach(() => {
    main = new Main();
    main.render(screen);
  });

  afterEach(() => {
    screen.innerHTML = "";
  });

  describe("[구성요소]", () => {
    it("남은 시간, 점수, 문제 단어, 입력, 시작 버튼 영역이 존재한다.", () => {
      expect(getByTestId(screen, "remain-time")).toBeTruthy();
      expect(getByTestId(screen, "score")).toBeTruthy();
      expect(getByTestId(screen, "question")).toBeTruthy();
      expect(getByTestId(screen, "answer-input")).toBeTruthy();
      expect(getByTestId(screen, "start-button")).toBeTruthy();
    });
  });

  describe("[기능]", () => {
    describe("시작전", () => {
      it("텍스트 입력후, Enter키를 눌러도 startGame 함수가 호출되지 않는다.", () => {
        const mockCall = jest.spyOn(main, "getRightAnswer");
        fireEvent.change(getByTestId(screen, "answer-input"), {
          target: { value: "test-answer" },
        });
        fireEvent.keyPress(getByTestId(screen, "answer-input"), enterKey);
        expect(mockCall).not.toBeCalled();
      });
    });

    describe("start 버튼을 클릭", () => {
      it("startGame 함수가 호출된다.", () => {
        const mockCall = jest.spyOn(main, "startGame");

        userEvent.click(getByTestId(screen, "start-button"));
        expect(mockCall).toBeCalled();
      });

      it("텍스트가 '초기화'로 변경된다.", () => {
        expect(getByTestId(screen, "start-button").innerHTML).toEqual("초기화");
      });
    });

    describe("오답 입력 후 Enter 입력", () => {
      it("getWrongAnswer 함수가 호출된다.", () => {
        const mockCall = jest.spyOn(main, "getWrongAnswer");

        fireEvent.change(getByTestId(screen, "answer-input"), {
          target: { value: "wrong-answer" },
        });
        fireEvent.keyPress(getByTestId(screen, "answer-input"), enterKey);
        expect(mockCall).toBeCalled();
      });
    });

    describe("정답 입력 후 Enter 입력", () => {
      it("getRightAnswer 함수가 호출된다.", () => {
        const mockCall = jest.spyOn(main, "getRightAnswer");

        fireEvent.change(getByTestId(screen, "answer-input"), {
          target: { value: questions[questions.length - 1] },
        });
        fireEvent.keyPress(getByTestId(screen, "answer-input"), enterKey);
        expect(mockCall).toBeCalled();
      });

      it("다음 문제가 출제된다.", () => {
        expect(getByTestId(screen, "question").innerHTML).toEqual(
          questions[questions.length - 2]
        );
      });

      it(`시간이 다시 ${loopTime}이 된다.`, () => {
        expect(getByTestId(screen, "remain-time").innerHTML).toEqual(
          `남은 시간: ${loopTime}초`
        );
      });

      it(`초기 점수가 유지된다.`, () => {
        expect(getByTestId(screen, "score").innerHTML).toEqual(
          `점수: ${numberOfAnswer}점`
        );
      });

      it(`입력란이 초기화된다.`, () => {
        expect(getByTestId(screen, "answer-input").innerHTML).toEqual("");
      });
    });

    describe("'초기화' 버튼 클릭", () => {
      it("initGame 함수가 호출된다.", () => {
        const mockCall = jest.spyOn(main, "initGame");

        userEvent.click(getByTestId(screen, "start-button"));
        expect(mockCall).toBeCalled();
      });

      it("텍스트가 '시작'으로 변경되고, 모든 상태값이 초기로 돌아간다.", () => {
        expect(getByTestId(screen, "remain-time").innerHTML).toEqual(
          "남은 시간: 10초"
        );
        expect(getByTestId(screen, "score").innerHTML).toEqual(
          `점수: ${numberOfAnswer}점`
        );
        expect(getByTestId(screen, "question").innerHTML).toEqual("문제 단어");
        expect(getByTestId(screen, "answer-input").value).toEqual("");
        expect(getByTestId(screen, "start-button").innerHTML).toEqual("시작");
      });
    });
  });
});
