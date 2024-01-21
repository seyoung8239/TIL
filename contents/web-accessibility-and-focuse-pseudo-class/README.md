---
title: '웹 접근성과 :focus 의사 클래스'
createdAt: 2023-07-23
summary: 웹 접근성에서 focusable한 element의 의미를 탐구 해보자
categories: [web accessibility]
---

# :focus 가상 클래스와 웹 접근성

## 키보드와 접근성

접근성을 위해 웹 페이지는 키보드만 활용해도 조작 가능해야 한다. `스크린 리더` 유저 뿐만 아니라 마우스나 트랙 볼과 같은 `pointing device`를 사용하지 못하는 사용자부터 키보드만 사용하고 싶은 사용자들 까지 고려한다.

### focusable elements should have interactive semantics

특정 요소가 키보드를 통해 포커스가 가능하다는 것은, 해당 요소가 상호작용 가능하다는 것을 의미한다. anchor, option 같은 요소들이 이에 해당한다.

대부분의 상호작용 요소는 기본적으로 포커스 가능하다. 반대로 명시적으로 `tabindex=0` 어트리뷰트를 추가함으로써 포커스 가능하게 만들 수 있다. 추가적으로 상호작용 가능하게 만들기 위해서는 키보드 이벤트에 대한 handler를 추가해야 한다.

### focusable한 요소는 반드시 :focus 스타일을 가져야 한다

`:focus` 혹은 `:focus-visible` pseudo-class를 통해 포커스된 요소에 대한 스타일을 지정할 수 있다.

## **`:focus` 가상 클래스 살펴보기**

`:focus` pseudo-class는 요소가 포커스 됐음을 표현한다. 보통 유저가 요소를 클릭하거나 `tab`키를 활용해 선택할 때 적용된다.

### 접근성 고려

-   저시력자들을 위한 시각적 indicator가 보이도록 하자. 따라서 대안 없는 `:focus { outline: none }` 을 지양하자.

-   focus indicator는 어느 배경에서도 잘 보여야 한다. 색깔이 다른 두 개의 테두리를 통해 어느 배경에서도 잘 인식되는 indicator를 지원할 수 있다. ([참조](https://www.w3.org/WAI/WCAG21/Techniques/css/C40))

-   focus된 요소는 기존에 비해 최소 2px 이상 커야한다.

## Tips

### focus border로 내부 콘텐츠가 밀리는 현상 해결하기

`box-shadow`로 border를 표현하면 내부 콘텐츠가 밀리지 않는다.

```css
box-shadow: inset 0 0 0 2px $color-teal-700;
```

window의 고대비 다크 테마에서 `box-shadow`가 제대로 동작하지 않는다는 이슈가 있다. `box-shadow` 대신 `outline` 속성을 활용하자

### :focus vs :focus-visible

focus 상태의 요소를 스타일로서 표현하는 것에는 많은 목적이 있다.

1. 일반 사용자에게 특정 요소의 포커스(활성) 상태를 알린다
2. 마우스 이외의 다양한 인터페이스로 서비스를 사용할 수 있도록 돕는다

이 두 가지 목적을 명시적으로 구분하고자 `:focus`와 `:focus-visible`으로 나누어진다. 일반적으로 `:focus` 의사 클래스를 통해 요소의 포커스 여부를 표현했으나, 이 때 등장하는 투박한 focus ring은 종종 서비스의 심미성을 해치곤 했다.(하지만 focus된 요소를 한 눈에 파악하기에는 적절하다)

이러한 이유로 대부분의 브라우저는 더이상 focus 상태에서 투박한 focus ring을 보여주지 않는다. 대신 `:focus-visible`이라는 의사 클래스를 지원하여, 키보드의 `tab`키 등을 통해 명시적으로 선택한 요소에 한해서 focus ring을 보여주도록 했다.

예를 들어 interactive 요소를 클릭하면 `:focus` 의사 클래스가 추가되지만 `:focus-visible`는 추가되지 않는다. 반면 `tab`키를 통해 요소를 선택하면 `:focus-visible` 의사 클래스가 추가되어 focus ring이 보이게 된다.

## References

-   https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
-   https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html
