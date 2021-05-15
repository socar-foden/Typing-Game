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
    this._store = Store.getInstance();
    this.$container = document.createElement("div");
    this.addEventListener();
  }

  setUp() {
    this.$container.innerHTML = "";

    this.$header = this.getHeader();
    this.$question = this.getQuestion();
    this.$answer_input = this.getAnswerInput();
    this.$start_button = this.getStartButton();

    this.$container.append(this.$header);
    this.$container.append(this.$question);
    this.$container.append(this.$answer_input);
    this.$container.append(this.$start_button);
  }

  render($el) {
    this.setUp();
    $el.append(this.$container);
  }

  update() {
    const header = this.getHeader();
    this.$container.replaceChild(header, this.$header);
    this.$header = header;
    const question = this.getQuestion();
    this.$container.replaceChild(question, this.$question);
    this.$question = question;
    const start = this.getStartButton();
    this.$container.replaceChild(start, this.$start_button);
    this.$start_button = start;
  }

  getHeader() {
    const { loopTime, numberOfAnswer } = this._store.getState();

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

  getQuestion() {
    const { status, questions } = this._store.getState();

    const question = document.createElement("div");
    question.setAttribute("data-testid", "question");
    question.innerHTML = `${
      status === READY ? "문제 단어" : questions[questions.length - 1]
    }`;

    return question;
  }

  getAnswerInput() {
    const answer_input = document.createElement("input");
    answer_input.setAttribute("type", "text");
    answer_input.setAttribute("data-testid", "answer");
    answer_input.setAttribute("id", "answer");
    answer_input.setAttribute("placeholder", "입력");

    return answer_input;
  }

  getStartButton() {
    const { status } = this._store.getState();

    const start_button = document.createElement("button");
    start_button.setAttribute("data-testid", "start");
    start_button.setAttribute("id", "start");
    start_button.innerHTML = `${buttonMessageMap[status]}`;

    return start_button;
  }

  addEventListener() {
    this.$container.addEventListener("click", (e) => {
      if (e.target.id === "start") {
        const { status } = this._store.getState();

        if (status === READY) {
          this.startGame();
        } else if (status === PROCEEDING) {
          this.initGame();
        }
      }
    });

    this.$container.addEventListener("keypress", (e) => {
      const { target, key } = e;
      const { questions, status } = this._store.getState();

      if (status === PROCEEDING && target.id === "answer" && key === "Enter") {
        const answer = questions[questions.length - 1];

        if (answer === target.value) {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
      }
    });
  }

  getNextFrame(loopTime) {
    return () => {
      const { status } = this._store.getState();

      if (status === PROCEEDING) {
        if (++this._frame % SECONDS_PER_FRAME === 0) {
          this.nextLoop(loopTime);
        }
        if (this._frame === SECONDS_PER_FRAME * (loopTime + 1)) {
          const { questions } = this._store.getState();
          this._frame = 0;

          if (questions.length <= 1) {
            this.endGame();
          } else {
            this.skipThisQuestion();
          }
        }
        this._rafId = requestAnimationFrame(this.getNextFrame(loopTime));
      }
    };
  }

  startGame() {
    const { loopTime } = this._store.getState();
    this._store.setState({ status: PROCEEDING });

    this._frame = 0;
    this._rafId = requestAnimationFrame(this.getNextFrame(loopTime));
    this.$answer_input.value = "";
  }

  initGame() {
    cancelAnimationFrame(this._rafId);
    this._store.setState(initialState);
    this.$answer_input.value = "";
  }

  endGame() {
    this._store.setState({ status: END, loopTime: LOOP_SECONDS });
  }

  nextLoop(loopTime) {
    this._store.setState({
      loopTime: loopTime - this._frame / 60,
    });
  }

  skipThisQuestion() {
    const { questions, numberOfAnswer } = this._store.getState();

    this._store.setState({
      loopTime: LOOP_SECONDS,
      questions: questions.slice(0, questions.length - 1),
      numberOfAnswer: numberOfAnswer - 1,
    });
  }

  getRightAnswer() {
    const { questions } = this._store.getState();

    this._store.setState({
      loopTime: LOOP_SECONDS,
      questions: questions.slice(0, questions.length - 1),
    });

    this._frame = 0;
    cancelAnimationFrame(this._rafId);
    this._rafId = requestAnimationFrame(this.getNextFrame(LOOP_SECONDS));
    this.$answer_input.value = "";
  }

  getWrongAnswer() {
    this.$answer_input.value = "";
  }
}

export default Main;
