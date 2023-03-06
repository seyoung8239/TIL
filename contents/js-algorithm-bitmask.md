# 2023-03-06 :: 비트마스크

정수의 이진수 표현으로 자료를 표현하는 방법이 비트마스크이다.

그래프 문제에서 이미 방문한 노드를 관리하기 위한 배열이 있다. 

배열이 아니라 다른 방식으로도 표현 가능하다

`[1, 0, 0, 0]` → `1000` → `2^3 * 1 + 2^2 * 0 + 2^1 * 0 + 2^0 * 0` → `8`

### 비트마스크의 장점

- 더 빠른 수행시간: `O(1)`
- 적은메모리 사용: 배열을 정수로 표현
- 더 간결한 코드: bitwise 연산을 통한 간결한 구현

### 정수표현을 이진수로 변환

```jsx
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

console.log(dec2bin(1)); // 1
console.log(dec2bin(-1)); // 11111111111111111111111111111111
console.log(dec2bin(256)); // 100000000
console.log(dec2bin(-256)); // 11111111111111111111111100000000
```

[How do I convert an integer to binary in JavaScript?](https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript)

<aside>
💡 **음수처리**
toStrig() 메서드는 음수를 처리할때 offset만 binary처리한 뒤 -기호를 붙여준다. 이는 예상치 못한 동작을 수행한다. 그래서 `d >>> 0` 연산을 통해 unsigned interger로 형변환을 하고 이진수로 변경한다.

</aside>