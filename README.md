# Typing-Game

## 해결 전략

- 앱 상태관리

  - 구조

    - Observer pattern
    - Page -> Store -> Notify Pages

      - App.js

        ```js
        // ...
        this._store.addObserver(this._main);
        // ...
        ```

      - XX Page.js

        ```js
        // ...
        this._store.setState({
          questions,
          numberOfAnswer: questions.length,
          loopTime: questions[0]?.second,
        });
        // ...
        ```

      - Store.js

        ```js
        // ...
        notifyAll() {
          this._observers.forEach((observer) => {
            observer.update();
          });
        }
        // ...
        ```

- Page 추상화

  ```js
  class Page {
    constructor(store) {
      this._store = store;
      this.$container = document.createElement("div");
      this.addEventListener();
    }

    render($el) {
      this.setUp();
      $el.append(this.$container);
    }

    addEventListener() {
      throw Error("addEventListener is not implemented.");
    }

    setUp() {
      throw Error("setUp is not implemented.");
    }
  }
  ```

- 라우터 구현

  - location.hash 사용
  - 각 hash에 맵핑된 Page 컴포넌트의 render 함수를 호출
  - App.js

    ```js
    // ..
    init() {
      this._router.addPage({ path: "/", view: this._main });
      this._router.addPage({ path: "/complete", view: this._complete });
      this._router.init();
    }
    // ..
    ```

- 타이머 표시
  - 1 frame = 1/60초를 이용한 requestAnimationFrame 사용
- api 호출
  - 불필요한 호출을 방지하기 위한 웹 스토리지 캐싱
- 스타일링 작업
  - 중복을 줄이기 위해 scss 사용
