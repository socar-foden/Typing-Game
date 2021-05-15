# Typing-Game

## 해결 전략

- 게임에 필요한 상태정보 파악
  - 문제
  - 맞은 갯수
  - 진행도
  - 남은 시간
  - 시작, 종료여부
- 앱 상태관리 설계 (Observer)
  - observer(components), subject(store)
- 의존성을 줄이기 위한 store 싱글톤 적용
- 기타 작업절차
  - 페이지 단위 개발
  - 각 페이지의 구성요소들을 작은 컴포넌트로 분리
  - css 스타일링 작업
