---
createdAt: '2023-03-13'
title: 'css selector'
summary: '다양한 css selector 방식에 대해 알아보자'
categories: ['css', 'selector']
---
# 2023-03-11 :: CSS Selector

- CSS는 HTML과 같은 구조화 된 문서를 어떻게 렌더링할 것인지를 정의하기 위한 언어이다.
- CSS는 HTML 요소의 style(layout, design)을 정의한다.
- html5 이후 html, css의 역할이 명확히 구분되기 시작했다.

## HTML과 CSS의 연동

```html
<head>
	<link rel="stylesheet" href="css/styles.css">
</head>
```

```html
<head>
	<style>
		h1 { color: red; }
		p {}
	</style>
</head>
```

```html
<body>
	<h1 style="color: red">Hi<h1>
</body>
```

## Reset CSS

- 모든 브라우저는 각기 다른 디폴트 스타일을 갖고 있다.
- Reset CSS는 기본적인 HTML 요소의 CSS를 초기화하는 용도로 사용한다
- 주도 아래 두 가지 Reset CSS를 사용한다
    - Eric Meyer’s reset
    - normalize.css

# Selector

## 어프리뷰트 셀렉터

```html
<style>
	/* a 요소 중 href 어트리뷰트를 갖는 모든 요소 */
	a[href] {color: red;}
</style>
```

```html
<style>
	/* a 요소 중 target 어트리뷰트의 값이 "_blank"인 모든 요소 */
	a[target="_blank"] {color: red;}
</style>
```

```html
<style>
	/* a 요소 중 title 어트리뷰트의 값 중 "first"를 포함하는 모든 요소 */
	a[title~="first"] {color: red;}
</style>
```

## 복합 셀렉터

![https://poiemaweb.com/img/descendant-child.png](https://poiemaweb.com/img/descendant-child.png)

- 부모: 1 level 상위
- 자손: 1 level 하위
- 조상: n level 상위
- 후손: n level 하위

### 후손 셀렉터

```html
셀렉터A 셀렉터B
```

### 자식 셀렉터

```html
셀렉터A > 셀렉터B
```

### 인접 형제 셀렉터

셀렉터A의 형제 요소 중 셀렉터A 바로 뒤에 위치하는 셀렉터B 요소를 선택한다

```html
셀렉터A + 셀렉터B
```

### 일반 형제 셀렉터

셀렉터A의 형제 요소 중 셀렉터A 뒤에 위치하는 모든 셀렉터B 요소를 선택한다

```html
셀렉터A ~ 셀렉터B
```

## 가상 클래스 셀렉터

가상 클래스 요소는 특정 상태에 따라 스타일을 정의할 때 사용된다. 특정 상태의 예시는 다음과 같다

- 마우스가 올라와 있을 때
- 링크를 방문하기 전과 후
- 포커스가 들어와 있을 때

이러한 상태는 원래 클래스가 존재하지 않지만 가상 클래스를 임의로 지정해서 선택할 수 있다.

가상 클래스는 :을 사용한다. 

### 링크 셀렉터, 동적 셀렉터

- `:link` : 방문하지 않은 링크
- `:visited` : 방문한 링크
- `:hover` : 마우스가 올라가 있을 때
- `:active` : 클릭된 상태일 때 (a태그 클릭한 순간)
- `:focus` : 인풋에 포커스가 들어갈 때

### UI 요소 상태 셀렉터

- :checked : 체크 상태일 때
- :enabled : 가능 상태일 때
- :disabled : 불가능 상태일 때

### 구조 가상 클래스 셀렉터

- :first-child : 모든 자식 요소 중 첫 번째
- :last-child : 모든 자식 요소 중 마지막
- :nth-child(n) : 셀렉터에 해당하는 모든 요소 중 앞에서 n번째 자식인 요소 선택
- :nth-last-child(n) : 셀렉터에 해당하는 모든 요소 중 뒤에서 n번째 자식인 요소 선택

```html
<style>
    /* ol 요소의 자식 요소인 li 요소 중에서 짝수번째 요소만을 선택 */
    ol > li:nth-child(2n)   { color: orange; }
    /* ol 요소의 자식 요소인 li 요소 중에서 홀수번째 요소만을 선택 */
    ol > li:nth-child(2n+1) { color: green; }

    /* ol 요소의 자식 요소인 li 요소 중에서 첫번쨰 요소만을 선택 */
    ol > li:first-child     { color: red; }
    /* ol 요소의 자식 요소인 li 요소 중에서 마지막 요소만을 선택 */
    ol > li:last-child      { color: blue; }

    /* ol 요소의 자식 요소인 li 요소 중에서 4번째 요소 요소만을 선택 */
    ol > li:nth-child(4)    { background: brown; }

    /* ul 요소의 모든 자식 요소 중에서 뒤에서부터 시작하여 홀수번째 요소만을 선택 */
    ul > :nth-last-child(2n+1) { color: red; }
    /* ul 요소의 모든 자식 요소 중에서 뒤에서부터 시작하여 짝수번째 요소만을 선택 */
    ul > :nth-last-child(2n)   { color: blue; }
  </style>
```

- nth-of-type(n) : 셀렉터에 해당하는 요소의 부모 요소의 자식 중 앞에서 n번째에 등장하는 요소?

:nth-child vs :nth-of-type

![The Difference Between :nth-child and :nth-of-type | CSS-Tricks](https://css-tricks.com/the-difference-between-nth-child-and-nth-of-type/)

- nth-child는 부모의 자식 모두에 해당
- nth-of-type은 부모의 자식 중 같은 타입만 해당

### 부정 셀렉터

- :not - 셀렉터에 해당하지 않은 요소를 선택

```css
<head>
  <style>
    /* input 요소 중에서 type 어트리뷰트의 값이 password가 아닌 요소를 선택 */
    input:not([type=password]) {
      background: yellow;
    }
  </style>
</head>
```

### 정합성 체크 셀렉터

- :valid : 정합성 검증 성공
- :invalid : 정합성 검증 실패

## 가상 요소 셀렉터

가상 요소란 요소의 특정 부분을 조작하기 위해 사용한다. 특정 부분은 아래와 같다

- 요소 컨텐츠의 첫글자 또는 첫줄
- 요소 컨텐츠의 앞 또는 뒤

가상 요소는 두개의 콜론 `::`을 사용한다.

- ::first-letter : 콘텐츠의 첫글자
- ::first-line : 콘텐츠의 첫줄
- ::after : 콘텐츠 뒤의 공간을 선택, 일반적으로 content 프로퍼티와 함께 사용된다
- ::before : 콘텐츠 앞의 공간을 선택, 일반적으로 content 프로퍼티와 함께 사용된다
- ::selection : 드래그한 콘텐츠를 선택한다, safari에서 동작하지 않는다