import Store from "../../store/store";
import { buttonMessageMap, PROCEEDING, READY } from "../../constants/constants";

class Main {
  constructor() {
    this.$container = document.createElement("div");
    this.addEventListener();
  }

  setUp() {
    this.$container.innerHTML = "";
    const state = Store.getInstance().getState();

    this.$header = this.getHeader(state);
    this.$question = this.getQuestion(state);
    this.$answer = this.getAnswer();
    this.$start = this.getStart(state);

    this.$container.append(this.$header);
    this.$container.append(this.$question);
    this.$container.append(this.$answer);
    this.$container.append(this.$start);
  }

  render($el) {
    this.setUp();
    $el.append(this.$container);
  }

  update() {
    const state = Store.getInstance().getState();

    const header = this.getHeader(state);
    this.$container.replaceChild(header, this.$header);
    this.$header = header;
    const question = this.getQuestion(state);
    this.$container.replaceChild(question, this.$question);
    this.$question = question;
    const start = this.getStart(state);
    this.$container.replaceChild(start, this.$start);
    this.$start = start;
  }

  getHeader(state) {
    const header = document.createElement("div");
    const remain_time = document.createElement("div");
    remain_time.setAttribute("data-testid", "remain-time");
    remain_time.innerHTML = `남은 시간: ${state.loopTime}초`;
    const score = document.createElement("div");
    score.setAttribute("data-testid", "score");
    score.innerHTML = `점수: ${state.numberOfAnswer}점`;

    header.append(remain_time);
    header.append(score);

    return header;
  }

  getQuestion(state) {
    const question = document.createElement("div");
    question.setAttribute("data-testid", "question");
    question.innerHTML = `${
      state.status === READY ? "문제 단어" : state.questions[0]
    }`;

    return question;
  }

  getAnswer() {
    const answer = document.createElement("input");
    answer.setAttribute("type", "text");
    answer.setAttribute("data-testid", "answer");
    answer.setAttribute("placeholder", "입력");

    return answer;
  }

  getStart(state) {
    const start = document.createElement("button");
    start.setAttribute("data-testid", "start");
    start.setAttribute("id", "start");
    start.innerHTML = `${buttonMessageMap[state.status]}`;

    return start;
  }

  addEventListener() {
    this.$container.addEventListener("click", (e) => {
      if (e.target.id === "start") {
        this.startGame();
      }
    });
  }

  startGame() {
    const store = Store.getInstance();
    const { loopTime } = store.getState();
    store.setState({ status: PROCEEDING });

    const next = () => {
      if (++this._frame % 60 === 0) {
        store.setState({
          loopTime: loopTime - this._frame / 60,
        });
      }
      if (this._frame === 660) {
        this._frame = 0;
        store.setState({
          loopTime: 10,
        });
      }
      requestAnimationFrame(next);
    };

    this._frame = 0;
    this._rafId = requestAnimationFrame(next);
  }
}

export default Main;
