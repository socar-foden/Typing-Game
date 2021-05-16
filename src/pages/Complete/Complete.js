import { buttonMessageMap, initialState } from "../../constants/constants";
import Store from "../../store/store";

class Complete {
  constructor() {
    this._store = Store.getInstance();
    this.$container = document.createElement("div");
    this.addEventListener();
  }

  setUp() {
    this.$container.innerHTML = "";

    this.$header = this.getHeader();
    this.$score = this.getScore();
    this.$avg_answer_time = this.getAvgAnswerTime();
    this.$restart_button = this.getRestartButton();

    this.$container.append(this.$header);
    this.$container.append(this.$score);
    this.$container.append(this.$avg_answer_time);
    this.$container.append(this.$restart_button);
  }

  render($el) {
    this.setUp();
    $el.append(this.$container);
  }

  getHeader() {
    const header = document.createElement("header");
    header.setAttribute("data-testid", "success-message");
    header.innerHTML = `Mission Complete!`;

    return header;
  }

  getScore() {
    const { numberOfAnswer } = this._store.getState();

    const score = document.createElement("div");
    score.setAttribute("data-testid", "score");
    score.innerHTML = `당신의 점수는 ${numberOfAnswer}점입니다.`;

    return score;
  }

  getAvgAnswerTime() {
    const { totalTime, numberOfAnswer } = this._store.getState();

    const avg_answer_time = document.createElement("div");
    avg_answer_time.setAttribute("data-testid", "avg-answer-time");
    avg_answer_time.innerHTML = `단어당 평균 답변 시간은 ${Math.floor(
      totalTime / numberOfAnswer
    )}초입니다.`;

    return avg_answer_time;
  }

  getRestartButton() {
    const start_button = document.createElement("button");
    start_button.setAttribute("data-testid", "restart-button");
    start_button.setAttribute("id", "restart-button");
    start_button.innerHTML = buttonMessageMap.END;

    return start_button;
  }

  addEventListener() {
    this.$container.addEventListener("click", (e) => {
      if (e.target.id === "restart-button") {
        this.resetGame();
      }
    });
  }

  resetGame() {
    this._store.setState(initialState);
    location.hash = "/";
  }
}

export default Complete;
