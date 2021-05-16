export const READY = "READY";
export const PROCEEDING = "PROCEEDING";
export const END = "END";

export const buttonMessageMap = {
  [READY]: "시작",
  [PROCEEDING]: "초기화",
  [END]: "다시 시작",
};

export const SECONDS_PER_FRAME = 60;
export const LOOP_SECONDS = 10;

export const enterKey = {
  key: "Enter",
  code: "Enter",
};

const questions = [
  "사과",
  "기차",
  "원숭이",
  "훈민정음",
  // "메시",
  // "까마귀",
  // "소원",
  // "아프리카",
  // "대한민국",
];

export const initialState = {
  questions,
  numberOfAnswer: questions.length,
  totalTime: 0,
  loopTime: 10,
  status: READY,
};
