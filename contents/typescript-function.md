---
title: TypeScript Function
summary: 타입스크립트에서 함수의 타입을 작성하는 방법과 제너릭, 오버로딩에 대해 알아보자.
createdAt: 2023-04-16
categories: ['typscript']
---
## Function Type Expression

함수를 가장 간단하게 서술하는 방법은 function type 표현식을 사용하는 것이다. 이런 타입은 화살표 함수와 비슷하게 나타낼 수 있다.

```jsx
function greeter(fn: (a: string) => void) {
	fn("hello world!");
}
```

위 예시에서 (a: string) ⇒ void의 의미는 다음과 같다.

- string 타입의 인수 a를 받는다
- void형태의 값을 return한다.

만약 인자 타입이 지정되지 않는다면 any로 자동 지정된다. 물론 인자의 이름을 명시하지 않고 `(string) ⇒ void`와 같이 나타낼 수도 있다.

물론 아래와 같이 type alias를 활용할 수도 있다.

```jsx
type GreetFunc = (a: string) => void;
function greeter(fn: GrretFunc) { // ...};
```

## Call Signatures

자바스크립트에서 함수는 호출이 가능한 동시에 프로퍼티를 가질 수 있다. 하지만 함수 타입 표현식 문법은 프로퍼티 선언을 따로 제공하지 않는다. 만약 callable을 서술하는 동시에 프로퍼티에도 타입을 지정하고 싶다면 객체 타입에 call signature를 함께 작성할 수 있다.

```tsx
type DescribableFunction = {
	description: string;
	(someArg: number): boolean;
}
function doSth(fn: DescribableFunction) {
	console.log(fn.description + "returned" + fn(6));
}
```

이러한 형태는 함수 타입 표현식과 조금 다름에 유의하자. 함수 타입 표현식에서는 화살표 기호를 사용하는 반면, call signature에서는 :기호를 사용한다.

## Construct Signatures

JS의 함수는 new 키워드와 함께 사용될 수도 있다. new 키워드는 일반적으로 생성자로 사용되며 객체를 리턴한다. 생성자 함수를 위한 시그니처를 선언하는 방법은 앞서 설명한 call signatures의 그것과 크게 다르지 않다. call signature 앞에 new 키워드를 추가하면 된다.

```tsx
type SomeConstructor = {
	new (someArs: number): SomeObj;
}
function fn(ctor: SomeConstructor) {
	return new ctor(8);
}
```

Date와 같은 몇몇 객체들은 new 키워드를 포함하거나 포함하지 않아도 호출이 가능하다. 이런 경우 하나의 객체 타입에 call signatures와 constructor signatures를 함께 선언하는 방식으로 구성할 수 있다.

## Generic Functions

제너릭 타입을 사용하여 함수의 입력과 출력을 연결지을 수 있다. 이러한 방식을 사용해 함수의 입력 타입에 따른 출력 타입을 더 자세하게 나타낼 수 있다.

```tsx
// any 사용으로 출력 타입이 모호해진다.
function firstEl(arr: any[]) { return arr[0]} 
// 제너릭을 사용해 더 구체적인 출력 타입을 얻을 수 있다.
function firstEl<T>(arr: T[]):T { return arr[0]}
```

```tsx
 // s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

### 타입 추론

위 예제에서 선언한 firstEl 함수를 호출할때 따로 제너릭 타입을 지정하지 않았다. 그 이유는 타입스크립트가 함수 호출 형식을 분석해 제너릭에 해당하는 타입을 추론하기 때문이다. 

### 제너릭 제약 명시하기

지금까지 제너릭을 활용해서 어떤 종류의 값으로도 호출할 수 있는 함수를 선언했다. 하지만 특정 타입만 제너릭으로 사용할 수 있도록 제한해야 하는 경우가 있다.

예시를 들어보자. 배열 혹은 유사배열의 길이를 비교해서 더 긴 배열을 리턴하는 함수를 어떻게 작성할 수 있을까? 유사배열은 T[]로 표현할 수 없으므로 조금 까다로울 수 있다. 이런 경우에는 extends 구문을 활용하여 제약을 명시할 수 있다.

```tsx
function longer<T extends {length: number}>(A: T, B: T):T {
	return A.length > B.length ? A : B
}
```

### 제너릭 제약을 다룰 때 주의할 점

제너릭 T는 확장되거나 축소되지 않는다. 특히 extends 절을 통해 제약을 줄 때, T의 타입 역시 제약 조건에 해당하는 `{ length: number }`으로 확장될 것이라 오해하기 쉽다. 하지만 T는 시그니처에 명시되어 있듯이 인자값을 그대로 반영한다.

```tsx
function minimum<T extends {length: number}>(A: T, len: number) {
	return A.length > len ? A : {length: len};
}
/*
Type '{ length: number; }' is not assignable to type 'Type'.
'{ length: number; }' is assignable to the constraint of type 
'Type', but 'Type' could be instantiated with a different subtype 
of constraint '{ length: number; }'.
*/

```

### 더 구체적인 제너릭 Type 명시하기

제너릭 타입 추론은 엄격하다. 제너릭 타입을 유연하게 사용하고 싶다면, 호출할 때 명시적으로 제너릭 타입을 명시해주어야 한다.

```tsx
function combine<T>(A: T[], B: T[]) {
	return A.concat(B);
}

combine([1,2,3], ['a','b','c']) // Error
combine<string|number>([1,2,3], ['a','b','c']) // OK
```

## Function Overloads

자바스크립트 함수는 다양한 인자 개수, 타입으로 호출될 수 있다. 이러한 구조는 함수 호출의 유연함을 제공하지만 오버로드 기능을 사용하기 힘들다. 예를들어 Date 객체를 생성하는 팩토리 함수를 만든다고 가정해보자. 이 함수가 인자로 timestamp 하나를 받거나, yy, mm, dd 세 개를 모두 받을 수 있도록 하고싶다면, 우리는 두 개의 인자가 들어왔을 때를 위한 복잡한 로직이 필요할 것이다.

타입스크립트는 이런 문제를 더 간편하게 만들기 위해 함수 오버로딩 기능을 제공한다. 오버로딩 함수를 구현하기 위해서는 함수 본체 바로 위에 해당 함수에 대한 시그니처를 작성해주면 된다.

```tsx
function makeDate(timestamp: number): Date;
function makeDate(y: number, m: number, d: number): Date;
function makeDate(yOrTimestamp: number, m?: number: d?: number): Date {
	(m !== undefined && d !== undefined) ? 
		new Date(yOrTimestamp, m, d) : 
		new Date(yOrTimestamp);
}

const d1 = makeDate(12345678); // OK
const d2 = makeDate(5, 5, 5); // OK
const d3 = makeDate(1, 3); // Error

// No overload expects 2 arguments, 
// but overloads do exist that expect either 1 or 3 arguments.
```

화살표 함수로 오버로딩을 명시하려면 다양한 call signatures를 추가하면 된다. 하지만 이러한 방식은 공식적으로 제공하는 방식이 아니다. 그렇기 때문에 unknown 타입을 더 좁혀주어야 한다.

```tsx
interface DateGeneratorType {
    (timestamp: number): Date;
    (y: number, m: number, d: number): Date;
}

const dateFactory: DateGeneratorType = (yOrTs, m?, d?) =>
// ((m ?? false) && (d ?? false)) ? new Date(yOrTs, m, d) : new Date(yOrTs);
// unkown type error로 아래와 같이 구체화 시켜야 했다.
{
    if ((m ?? false) || (d ?? false)) {
        if (typeof m === 'number' && typeof d === 'number')
            return new Date(yOrTs, m, d);
        throw Error('invalid');
    } else {
        return new Date(yOrTs);
    }
}

dateFactory(1234);
dateFactory(2023, 11, 30);
dateFactory(2023, 80);
```

함수 오버로딩을 사용하기 위해서 주의해야할 점들이 있다.

- 함수 구현체의 시그니처는 외부에서 확인할 수 없다.
- 오버로드 기능을 사용하고자 한다면, 두 개 이상의 시그니처를 구현체 함수 위에 작성해야한다.
- 구현체 시그니처는 반드시 오버로드 시그니처와 호완가능해야 한다.