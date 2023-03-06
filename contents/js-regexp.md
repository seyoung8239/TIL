# 2023-03-05 :: 정규표현식

## 메서드

### `RegExp.prototype` method

- `exec()`
- `test()`

### `String.prototype` method

- `match()`
- `matchAll()`
- `replace()`
- `replaceAll()`
- `search()`

### 자잘한 팁

- 글로벌 옵션(`\g`)를 통해 매칭되는 모든 항목들을 배열로 받을 수 있다.
- All이 붙은 매서드는 글로벌 옵션을 필수로 받는다
- `(?<name>)`를 통해 substring을 캡처할 수 있다
- `^`, `$` 을 통해 부분일치, 전방일치, 후방일치, 전체일지를 설정할 수 있다