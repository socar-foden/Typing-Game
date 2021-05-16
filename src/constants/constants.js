export const READY = "READY";
export const PROCEEDING = "PROCEEDING";
export const END = "END";

export const buttonMessageMap = {
  [READY]: "시작",
  [PROCEEDING]: "초기화",
  [END]: "다시 시작",
};

export const SECONDS_PER_FRAME = 60;

export const enterKey = {
  key: "Enter",
  code: "Enter",
};

export const initialState = {
  questions: [],
  numberOfAnswer: 0,
  totalTime: 0,
  loopTime: 0,
  status: READY,
};

const mock_questions = [
  { second: 10, text: "hello" },
  { second: 10, text: "world" },
  { second: 8, text: "this" },
  { second: 3, text: "is" },
  { second: 15, text: "kakaopay" },
  { second: 5, text: "we" },
  { second: 5, text: "are" },
  { second: 15, text: "kakaopay" },
  { second: 15, text: "frontend" },
  { second: 20, text: "developers" },
  { second: 15, text: "join" },
  { second: 10, text: "us" },
];

export const mock_initialState = {
  questions: mock_questions,
  numberOfAnswer: mock_questions.length,
  totalTime: 0,
  loopTime: mock_questions[mock_questions.length - 1].second,
  status: READY,
};
