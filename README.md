# Typing-Game

## 해결 전략

- 게임에 필요한 상태정보(store) 파악 - 싱글톤
  - 문제
  - 맞은 갯수
  - 진행도
  - 남은 시간
  - 시작, 종료여부
- mock 데이터로 개발
- 앱 상태관리 설계 (Observer 패턴)
  - observer(page), subject(store)
- page 레벨 모듈 구현
  - render($el) 함수로 root $el에 렌더링
- 라우터 구현
- css 스타일링 작업
- 실제 api 연동
- 추상화
