---
title: '(번역)React 프로젝트에서 어떻게 비즈니스 로직을 분리할까?'
createdAt: '2023-04-12'
summary: 'OOP와 Model 계층을 활용해서 더 안전하고 유연하게 비즈니스 로직 처리하기'
categories: ['react', 'business logic', 'OOP']
---
# (번역)React 프로젝트에서 어떻게 비즈니스 로직을 분리할까?

[The right way to place business logic in your React application](https://itnext.io/the-right-way-to-place-business-logic-in-your-react-application-8bf16145f48d)

우리는 리액트 어플리케이션의 구조에 대해 많은 이야기를 나누어 왔다. 예를 들면 파일 이름은 어떻게 짓고 사이드 이펙트들을 어떻게 훅으로 관리할지에 관해서 말이다. 우린는 또한 뷰단을 개발하는데 있어 유용한 여러가지 프로그래밍 패러다임에 대해 이야기해왔다. 이런 여러 의논들 중에 아직 제대로 결정하지 못한 것이 있다. 바로 비즈니스 로직을 둘 위치이다. 이러한 관점에서 우리가 간과한 것이 하나 있다. React는 view를 위ㄴ한 라이브러리란 것이다.(React는 프레임워크가 아니다)

많은 경우에 개발자들은 간단한 로직들을 컴포넌트 내부에 작성해왔다. 숙련된 개발자들 역시 이런 로직과 연산들을 커스텀훅이나 헬퍼함수로 빼는 데 그쳤다. 하지만 이러한 방식도 아직 해결되지 못한 문제를 낳았다. 아무리 우리가 적은 수의 컴포넌트에서 로직들을 분리했을 때, 이 로직들이 여러 부분에 파편화 되는 문제가 발생했다. 쇼핑몰 웹사이트를 개발한다고 가정해보자. 만약 카트에 대한 로직을 수정하게 되면, 연관된 product나 validation 모듈 역시 변경되어야 한다. 그리고 이와 연관된 헬퍼함수와 뷰 역시 수정해야 할 것이다.

## Omniview

이러한 상황에서 우리는 자잘한 사항을 건너뛰고 더 거시적인 관점에서 문제를 바라볼 필요가 있다. 만약 우리가 React를 단순히 view를 위한 라이브러리인 점을 인지하면 많은 문제들은 자연스럽게 해결된다. 전통적인 MVC/MVP 혹은 MVVM 구조를 떠올렸을 때, React가 V를 담당한다면 그 이외의 M 혹은 MV를 담당하는 부분이 분명 필요할 것이다.

많은 프로젝트 사이에서, 나는 백앤드에 존재하는 수 많은 훌륭한 패턴들이 프론트앤드 생태계에서 덜 주목받는 것을 느꼈다. 구체적으로 layering 그리고 디자인패턴들이 그렇다. 그러한 이유는, 짐작컨데, 프론트엔드 분야는 상대적으로 발생된지 얼마되지 않았고 새로운 기술들을 따라잡기 바빠서가 아닐까 생각한다. 전형적인 Spring MVC 구조를 떠올려 보면, controller, service, repository와 같은 구성요소가 존재한다. controller는 비즈니스 로직을 갖니 않는다. service는 모델이 랜더링된는 방식 혹은 직렬화 되는 방식을 모른다. 반면 repository는 데이터 접근에 대해서만 관여한다. 하지만, React에서는 이런 구성요소를 native로 제공하지 않는다. 그렇기 때문에 컴포넌트 내에서 역할이 혼재된 코드를 작성하게 된다. 이러한 이유로 우리는 비즈니스 로직을 컴포넌트 곳곳에 작성하며 성능과 코드 퀄리티를 떨어뜨린다.

## The business logic leakage

이러한 상황을 지금부터 비즈니스 로직 누수라고 부르겠다. 그 이유는, 비즈니스 로직이 있어야할 곳이 아닌 잘못된 곳에 있기 때문이다. 프론트엔드 기술들은 아직 이들을 관리하기 위한 괜찮은 메커니즘이 없기 때문에 컴포넌트, 훅, 헬퍼함수 등등 잘못된 곳에 둔다.

이런 비즈니스 로직 누수는 찾기 위해선는 상당한 관심이 필요하다. 누수를 추적할 수 있는 증산 몇가지를 찾았는데 아래와 같다.

- using transformers
- x.y.z
- 방어적 프로그래밍

### Using transformers

이 패턴은 비교적 찾아내기 쉽다: 당신이 만약 map을 통해 데이터를 변환하며 맥락의 경계를 넘나들 때를 찾으면 된다. 당신은 분명 아래와 같은 코드를 보거나 작성한 경험이 있을 것이다.

```jsx
fetch(`https://5a2f495fa871f00012678d70.mockapi.io/api/addresses`)
.then((r) => r.json())
.then((data) => {
    const addresses = data.map((datum: RemoteAddress) => ({
        street: datum.streetName,
        address: datum.streetAddress,
        postcode: datum.postCode
    }))    setAddresses(addresses)
});
```

위 스니팻을 보면 프론트엔드에서 소비하는 데이터와 백엔드에서 제공하는 데이터의 형식이 다르다는 것을 알 수 있다. 이러한 api는 다른 팀이 작성했거나, 써드파티 서비스를 사용하는 경우 자주 발생한다. 이런 코드는 아래와 같은 원칙들을 위배한다.

- 컴포넌트는 RemoteAddress 타입을 알고 있어야 한다.
- 컴포넌트는 Address를 위한 새로운 타입을 정의해야 한단.
- data.map은 낮은 레벨의 mapping 작업을 수행한다.

→graphQL을 사용하는 이유가 되기도 한다.

### x.y.z

당신에 데이를 접근할 때, .(dot 연산자)를 너무 많이 사용하다면 무언가를 놓치고 있다는 의미이다. 예를들어 `person.deliveryAddress` 는 `person.primaryAddress.street.streetNumber + person.primaryAddress.suburb` 보다 낫다.

아래 코드에서 보이는 ProductDialog는 product에 대해 너무 많이 알고 있다. 만약 product가 변경되는 경우 여러 곳에서 변경이 필요하다.

```jsx
const ProductDialog = (props) => {
  const { product } = props;
  if(product.item.type === 'Portion') {
    //do something
  }
}s
```

여기서 우리는 모델이 아닌 데이터를 다루고 있다. 따라서 product.isPortion() 이라는 메서드가 있다면 낮은 레벨의 데이터를 더 의미있게 확인할 수 있을 것이다.

### Defensive programming

개인적으로 나는 방어적 프로그래밍에 찬성하고, 가끔 이를 사용한다. 하지만 때때로 이러한 방식은 남용되어 가독성을 떨어뜨린다.

```jsx
const ProductDetails = (props) => {
  const { product } = props
  const { item } = product
  const { media } = item as MenuItem
  
  const title = (media && media.name) || ''
  const description = (media && media.description) || ''
  return (
    <div>
      {/* product details */}
    </div>
  )
}
```

위 코드는 컴포넌트 내부에서 null 체크를 하고 fallback을 지정하고 있다. 이러한 작업들을 컴폰넌트에서 하는 것은 적절하지 못하다.

## How to fix the problem?

이 문제를 위한 두 가지 해결법을 제안한다.

1. regular refactoring
2. modeling

### Regular refactoring

우리가 적용할 수 있는 첫 번째 방법은 다른 문제를 해결할 때와 마찬가지로 리팩토링을 하는 것이다. 컴포넌트 내부에 존재하는 로직, 연산을 헬퍼함수로 추출할 수 있다.

아래 예시를 참고해서 map에 전달된 콜백을 핼퍼함수로 추출한 뒤 따로 파일로 관리 해보자.

```jsx
const transformAddress: Address = (address: RemoteAddress) => {
    return ({
        street: datum.streetName,
        address: datum.streetAddress,
        postcode: datum.postCode
    })
}
//...
const addresses = data.map(transformAddress)
```

이 경우에는 그렇게 심각해보이지 않는다. 하지만 대부분의 프로덕트 코드에서는 엄청나게 많은 널체크와 fallback 처리가 행해진다. 그리고 이러한 경우 translation 작업 역시 필요한 경우가 많다. 이런 경우 아래와 같이 함수로 추출한 후 관리할 수 있다.

```jsx
const states = {
  vic: "Victoria",
  nsw: "New South Wales",
  //...
};
const transformAddress: Address = (address: RemoteAddress) => {
  return {
    street: address.streetName,
    address: address.streetAddress,
    postcode: address.postCode,
    state: states[address.state.toLowerCase()]
  };
};
```

또한 널체크를 위한 함수를 아래와 같이 따로 선언할 수 있다.

```jsx
const getTitle = (media) => (media && media.name) || ''
const getDescription = (media) => (media && media.description) || ''
```

transformAddress나 getTitle같은 함수들이 점점 더 많이 helper.ts로 이동하는 경우, 결국 거대하고 무엇이든 다 하는 파일이 탄생할 것이다. 이는 곧 가독성을 떨어리고 유지보수 하기 힘든 코드를 만든다. 우리는 이 파일들을 작은 모듈로 나눌 수 있다. 하지만 함수간의 참조로 인해 결국 코드를 더 이해하기 힘들 수 있다. 이러한 문제는 우리가 이미 OOP탄생 이전에 겪었던 문제이다. —우리는 너무 많은 모듈과 그 안의 많은 함수 때문에 코드의 흐름을 잃어버리기 쉬웠다. 따라서 우리는 이런 helper 함수들을 더 잘 관리하기 위한 새로운 방법이 필요하다.

다행이도 우리는 바퀴를 재발명할 필요가 없다. 이러한 문제들을 해결하고자 OOP가 등장했기 때문이다. OOP의 class 그리고 캡슐화를 활용하면 이런 함수들을 쉽게 묶어서 관리하는 동시에 가독성도 개선된다. 이렇게 그룹화 하는 과정을 모델링이라고 하는데, 이를 통해 UI에서 직접적으로 사용하는 데이터들을 더 편리하게 구성할 수 있다.

## Modelling

요약하자면, 모델링은 데이터와 동작을 함께 두는 동시에 세부 구현은 숨기고 데이터 사용자가 필요한 데이터를 제공하는데 집중한다. 따라서 우리는 product.item.type === 'Portion’와 같은 코드를 작성하는 대신 Product 클래스의 인스턴스에서 isPortion()을 호출하면 된다. 이는 백엔드 서비스에는 일반적인 패턴이지만 프론트엔드에서 널리 사용되지 않는다. 그 이유는, 이전에 이미 언급했지만, 사람들이 리액트는 View만 책임진다는 사실을 간과하기 때문이다. 그리고 건강한 프론트엔드 어플리케이션은 모델, 백엔드와 소통하기 위한 로직, 로깅, 라우팅 등 다른 구성요소를 필요로한다. 하지만 이 포스팅에서는 오직 모델링과 로직에 집중하려고 한다.

앞서 언급했던 예시로 돌아가서 우리는 Adrress 클래스를 구현해 map에 전달되는 콜백을 대체할 수 있다. 클래스 구현은 아래와 같다.

```jsx
class Address {
  constructor(private addr: RemoteAddress) {}  
	get street() {
    return this.addr.streetAddress;
  }  
	get postcode() {
    return this.addr.postcode;
  }
}
```

이를 사용하는 방식에는 변화가 없다.

```jsx
const AddressLine = ({ address }: { address: Address }) => (
  <li>
    <div className="result">{address.street}</div>
  </li>
);
```

변경되는 지점을 아래와 같이 transformAddress를 new Address로 변경하는 부분 뿐이다.

```jsx
const addresses = data.map((addr: RemoteAddress) => new Address(addr))
```

그리고 translation을 위한 로직은 아래와 같이 은닉시킬 수 있다.

```jsx
private readonly states = {
    vic: "Victoria",
    nsw: "New South Wales",
    //...
  };
get state() {
  return this.states[this.addr.state.toLowerCase()];
}
```

이제 모든 구조들이 더 깔끔해졌다. states는 Address 클래스의 private 멤버가 되었다. 클래스를 사용하여 연관된 로직들을 하나로 집약했기 때문에 응집도도 높아졌고 관리도 쉬워졌다.

연관된 로직들을 한 곳에 두는 것에는 다른 이점도 있다. 먼저, 이러한 분리를 통해 믿음직한 테스트 코드를 더 쉽게 작성할 수 있다. 이제 컴포넌트 단에서 nullish, out bound 테스트를 할 필요가 없다. 반면 모델에서는 데이터와 로직에 집중한 테스트 코드를 작성할 수 있다. 두 번째로, 이렇게 일관성 있는 코드는 여러 상황에 응용하기 쉽다. 마지막으로, 모델을 통해 추상화가 되어있기 때문에 api의 스펙이 변경되어도 뷰에 대한 변경 없이 모델만 수정하면 된다.

모델의 개수가 늘어날수록 이들을 관리하기 위한 새로운 계층이 필요할지도 모른다. 이 새로운 계층은 UI의 존재를 알 필요가 없으며 순수하게 비즈니스 로직에 집중할 수 있다. 우리는 이 계층을 anti-corruption-layer라고 부른다. —이 계층은 변경의 위험이 있는 써드파티 데이터 구조로부터 `view단의 간섭을 막는다. 이 중간 계층을 통해 우리가 변경해야 할 것은 모델의 transformers 뿐이다.

## Summary

비즈니스 로직을 캡슐화 하는 것은 상대적으로 큰 주제이다. 이번 포스팅에서 우리는 비즈니스 로직 누수의 여러 증상에 대해 의논했고 이들을 어떻게 해결할지에 대해 알아봤다. 리팩토링을 통해 우리는 컴포넌트가 데이터를 랜더링 하는데에만 더 집중하도록 했다. 우리는 비즈니스 로직을 순수 자바스크립트 파일로 분리해야 한다. 또한 우리는 모델링을 통해 데이터를 사용하기 위한 세부구현은 숨기고 데이터에 접근하기 위한 getter만 노출했다. 이는 모든 로직들을 모델 안에 캡슐화하여 뷰의 역할과 책임을 더 간단하게 만들었다. 이를 통해 우리는 다음과 같은 이점들을 가져올 수 있었다: 뷰와 모델에 대하 더 쉬운 테스트, 비즈니스 요구사항에 더 유연하게 대처 가능, 뷰의 역할과 책임을 더 견고히 했다.