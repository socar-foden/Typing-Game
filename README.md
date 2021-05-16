# Typing-Game

## 해결 전략

- 게임에 필요한 상태정보(store) 파악
  - 문제
  - 맞은 갯수
  - 진행도
  - 남은 시간
  - 시작, 종료여부
- store 싱글톤 적용
- 앱 상태관리 설계 (Observer 패턴)
  - observer(page), subject(store)
- page 모듈들 구현
  - render(el) 함수로 root el에 렌더링
- 라우터 구현
- css 스타일링 작업
- page 추상화
