import {
  buttonMessageMap,
  END,
  initialState,
  PROCEEDING,
  READY,
  SECONDS_PER_FRAME,
} from "../../constants/constants";
import { getQuestions } from "../../services/service";
import "./Main.scss";

class Main {
  constructor(store) {
    this._store = store;
    this.$container = document.createElement("div");
    this.$container.className = "main";
    this.addEventListener();
  }

  async setQuestion() {
    try {
      const memo = sessionStorage.getItem("memo_questions");
      let questions = [];

      if (memo) {
        questions = JSON.parse(memo);
      } else {
        const res = await getQuestions();
        questions = await res.json();
        sessionStorage.setItem("memo_questions", JSON.stringify(questions));
      }

      this._store.setState({
        questions,
        numberOfAnswer: questions.length,
        loopTime: questions[0]?.second,
      });
    } catch (e) {
      console.error(`[Main] setQuestion :: `, e);
    }
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
    this.setQuestion();
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

    const header = document.createElement("header");
    const remain_time = document.createElement("span");
    remain_time.setAttribute("data-testid", "remain-time");
    remain_time.innerHTML = `남은 시간: ${loopTime}초`;
    const score = document.createElement("span");
    score.setAttribute("data-testid", "score");
    score.innerHTML = `점수: ${numberOfAnswer}점`;

    header.append(remain_time);
    header.append(score);
    header.className = "header";

    return header;
  }

  getQuestion() {
    const { status, questions } = this._store.getState();

    const question = document.createElement("h1");
    question.setAttribute("data-testid", "question");
    question.innerHTML = `${
      status === READY ? "문제 단어" : questions[questions.length - 1]?.text
    }`;
    question.className = "question";

    return question;
  }

  getAnswerInput() {
    const answer_input = document.createElement("input");
    answer_input.setAttribute("type", "text");
    answer_input.setAttribute("data-testid", "answer-input");
    answer_input.setAttribute("id", "answer-input");
    answer_input.setAttribute("placeholder", "입력");
    answer_input.className = "answer-input";

    return answer_input;
  }

  getStartButton() {
    const { status } = this._store.getState();

    const start_button = document.createElement("button");
    start_button.setAttribute("data-testid", "start-button");
    start_button.setAttribute("id", "start-button");
    start_button.innerHTML = `${buttonMessageMap[status]}`;
    start_button.className = "start-button";

    return start_button;
  }

  addEventListener() {
    this.$container.addEventListener("click", (e) => {
      if (e.target.id === "start-button") {
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

      if (
        status === PROCEEDING &&
        target.id === "answer-input" &&
        key === "Enter"
      ) {
        const answer = questions[questions.length - 1]?.text;

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
          this.skipThisQuestion();

          if (questions.length <= 1) {
            this.endGame();
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
    this._store.setState({
      status: END,
      loopTime: 0,
    });
    this.$answer_input.value = "";
    location.hash = "/complete";
  }

  nextLoop(loopTime) {
    this._store.setState({
      loopTime: loopTime - this._frame / 60,
    });
  }

  skipThisQuestion() {
    const { questions, numberOfAnswer } = this._store.getState();

    this._store.setState({
      loopTime: questions[questions.length - 2]?.second,
      questions: questions.slice(0, questions.length - 1),
      numberOfAnswer: numberOfAnswer - 1,
    });
  }

  getRightAnswer() {
    const { questions, loopTime, totalTime } = this._store.getState();

    if (questions.length > 1) {
      this._store.setState({
        loopTime: questions[questions.length - 2]?.second,
        questions: questions.slice(0, questions.length - 1),
        totalTime:
          totalTime + (questions[questions.length - 1]?.second - loopTime),
      });

      this._frame = 0;
      cancelAnimationFrame(this._rafId);
      this._rafId = requestAnimationFrame(
        this.getNextFrame(questions[questions.length - 2]?.second)
      );
      this.$answer_input.value = "";
    } else {
      this.endGame();
    }
  }

  getWrongAnswer() {
    this.$answer_input.value = "";
  }
}

export default Main;
