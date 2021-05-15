import Store from "../../store/store";
import {
  buttonMessageMap,
  END,
  initialState,
  LOOP_SECONDS,
  PROCEEDING,
  READY,
  SECONDS_PER_FRAME,
} from "../../constants/constants";

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

  getHeader({ loopTime, numberOfAnswer }) {
    const header = document.createElement("div");
    const remain_time = document.createElement("div");
    remain_time.setAttribute("data-testid", "remain-time");
    remain_time.innerHTML = `남은 시간: ${loopTime}초`;
    const score = document.createElement("div");
    score.setAttribute("data-testid", "score");
    score.innerHTML = `점수: ${numberOfAnswer}점`;

    header.append(remain_time);
    header.append(score);

    return header;
  }

  getQuestion({ status, questions = [] }) {
    const question = document.createElement("div");
    question.setAttribute("data-testid", "question");
    question.innerHTML = `${
      status === READY ? "문제 단어" : questions[questions.length - 1]
    }`;

    return question;
  }

  getAnswer() {
    const answer = document.createElement("input");
    answer.setAttribute("type", "text");
    answer.setAttribute("data-testid", "answer");
    answer.setAttribute("id", "answer");
    answer.setAttribute("placeholder", "입력");

    return answer;
  }

  getStart({ status }) {
    const start = document.createElement("button");
    start.setAttribute("data-testid", "start");
    start.setAttribute("id", "start");
    start.innerHTML = `${buttonMessageMap[status]}`;

    return start;
  }

  addEventListener() {
    this.$container.addEventListener("click", (e) => {
      if (e.target.id === "start") {
        const store = Store.getInstance();
        const { status } = store.getState();

        if (status === READY) {
          this.startGame(store);
        } else if (status === PROCEEDING) {
          this.initGame(store);
        }
      }
    });

    this.$container.addEventListener("keypress", (e) => {
      const { target, key } = e;
      const { questions, status } = Store.getInstance().getState();

      if (status === PROCEEDING && target.id === "answer" && key === "Enter") {
        const answer = questions[questions.length - 1];

        if ((answer = target.value)) {
        }
      }
    });
  }

  startGame(store) {
    const { loopTime } = store.getState();
    store.setState({ status: PROCEEDING });

    const next = () => {
      const { status } = store.getState();

      if (status === PROCEEDING) {
        if (++this._frame % SECONDS_PER_FRAME === 0) {
          this.nextLoop(store, loopTime);
        }
        if (this._frame === SECONDS_PER_FRAME * (loopTime + 1)) {
          const { questions } = store.getState();
          this._frame = 0;

          if (questions.length <= 1) {
            this.endGame(store);
          } else {
            this.skipThisQuestion(store);
          }
        }
        this._rafId = requestAnimationFrame(next);
      }
    };

    this._frame = 0;
    this._rafId = requestAnimationFrame(next);
  }

  initGame(store) {
    cancelAnimationFrame(this._rafId);
    store.setState(initialState);

    const answer = this.getAnswer();
    this.$container.replaceChild(answer, this.$answer);
    this.$answer = answer;
  }

  endGame(store) {
    store.setState({ status: END, loopTime: LOOP_SECONDS });
  }

  nextLoop(store, loopTime) {
    store.setState({
      loopTime: loopTime - this._frame / 60,
    });
  }

  skipThisQuestion(store) {
    const { questions, numberOfAnswer } = store.getState();

    store.setState({
      loopTime: LOOP_SECONDS,
      questions: questions.slice(0, questions.length - 1),
      numberOfAnswer: numberOfAnswer - 1,
    });
  }
}

export default Main;
