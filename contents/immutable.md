---
title: Immutability
createdAt: 2023-04-13
summary: 프론트엔드 생태계에서 불변성 원칙이 널리 적용되는 이유
categories: [Immutability, 상태관리]
---
## 함수형 프로그래밍과 불변성

불변성은 함수형과 함께 연관되어 자주 언급된다. 불변성은 수학적 개념인 함수를 프로그램으로 구현하기 위해 추가된 규칙이다. 아래에서 프로그래밍 세계와 수학 세계의 차이점을 간략하게 나열한다.

- 프로그래밍에는 상태를 저장하는 변수라는 개념이 존재한다.
- 수학에서는 상태라는 개념이 존재하지 않는다.

상태라는 개념이 존재하지 않는 수학의 함수를 프로그래밍으로 구현한 순수 함수는 외부 상태에 의존하지 않아야 한다.

또한 수학에서는 상태라는 개념이 존재하지 않기 때문에 상태를 변경해서는 안되고 이를 위해 불변성이라는 개념이 등장했다.

## 불변성이란

React에서 useState 훅을 통해 상태를 변경할 때, 우리는 불변성을 유지해야 한다. React 뿐만 아니라 FE 생태계의 대표적인 라이브러리 Redux에서도 불변성를 지키며(순수함수로) 값을 변경해야한다.

불변성을 지키며 상태를 변경한다는 것은 어떤 의미를 갖는가? 단순히 변수를 직접 변경하지 않아야 한다는 것을 의미할까?

이에 대한 답을 하기 위해서는 변수와 메모리의 관계에 대해 더 자세히 들여다 볼 필요가 있다.

## 객체는 참조형 변수이다

순수 함수에서 값을 사용할 때, 외부의 값에 의존해서는 안된다. 그래서 일반적으로 인자로 값을 받아 사용한다. JS에서 원시 값을 다루는 경우에는 문제가 발생하지 않는다. 원시 값은 call by value로 넘겨지기 때문이다. 하지만 객체타입을 전달하는 경우에는 상황이 달라진다. JS에서 객체 타입은 call by reference를 통해 함수에 전달된다. 만약 인자로 전달받은 객체를 변경하는 경우 외부 상태의 값 역시 함께 변경된다. 그렇기 때문에 함수는 의도하지 않은 외부 의존성을 갖게 된다. 이러한 JS의 특성으로 인해 불변성은 위협받는다.

## 불변성을 지켰을 때의 장점

여러 곳에서 무분별하게 상태를 참조하고 변경하면 전체 서비스의 흐름을 추적하기 힘들어진다. 따라서 상태를 변경하는 방식을 제한함으로써 조금더 예상 가능한 형태를 만들고자 한다. 전역 변수는 무분별한 상태 변경으로 부터 취약한 곳 중 하나이다. 아래 코드에서 콘솔의 결과를 예측해보자.

```jsx
let name = 'A'
function changeName() { name = 'B'};

setTimeout(()=> {name='C'},0);
changeName();

console.log(name);
```

콘솔에 B, C 둘 중 어느 것이 출력 되어도 어색하지 않다. 즉 위 코드는 예측 불가능하다. 불변성을 유지하며 순수 함수를 사용하면 메모리의 값에 의존하지 않으므로 예상치 못한 상태 변화를 방어할 수 있다.

### 상태의 변경 추적하기

서비스의 상태를 변경 하는 방식에는 어떤 것이 있을까? 간단하게 아래와 같은 예시를 떠올릴 수 있다.

```jsx
let developer1 = {name: 'A'};
function changeDeveloper(developer, name) {
	developer.name = name;
	return developer;
}
developer2 = changeDeveloper(developer1, 'B');
```

좋다. 위와 같은 코드를 통해 기존의 developer 상태를 변경할 수 있다. 하지만 이 경우 상태의 변화를 추적할 수 있을까? 아래와 같이 확인해보자.

```jsx
console.log(devloper1 === developer2); // true
```

이런 상황에서 개발자는 상태의 변화를 추적하기 힘들어진다. 이 문제를 해결할 수 있는 방법은 무었일까? 가장 간단한 해결방법은 객체를 새로 생성해서 반환하면 된다.

```jsx
const developer1 = {name: 'A'};
const changeDeveloper = (developer, name) => ({...developer, name})
developer2 = changeDeveloper(developer1, 'B');

console.log(developer1 === developer2) // false
```

developer2 객체를 새로 생성했기 때문에 위와 같은 결과를 얻을 수 있다. 즉 상태가 변경했음을 알 수 있게 되었다.

위 원리는 React에서 상태 변화를 감지하는 데에도 사용된다. 리액트를 활용한 개발에서 setState()를 호출하는 경우 내부에서 Object.is()를 활용한 상태 변화를 감지하여 변경된 경우 리렌더링한다.

React 뿐만 아니라 Redux 역시 동일한 원리로 상태 변화를 감지하며, reducer 역시 순수함수로 작성하기 때문에 상태를 더 예측가능하고 추적가능한 형태로 관리할 수 있다.

## References

[https://evan-moon.github.io/2019/12/29/about-pure-functions/](https://evan-moon.github.io/2019/12/29/about-pure-functions/)