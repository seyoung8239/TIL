---
title: 'Storybook in turbo repo'
createdAt: 2023-06-12
summary: 모노레포 환경에서 스토리북 도입하기와 생산성 향상시키기
categories: [storybook, mono repo]
---

# storybook 도입 (feat. monorepo)

## Storybook의 이점

<b>UI 개발 안정성 향상</b>

컴포넌트를 페이지로부터 분리할 수 있다. 따라서 더 다양한 케이스에서 컴포넌트를 테스팅할 수 있다. 엣지 케이스, 다양한 기기 환경

<b>테스팅</b>

스토리는 독립적으로 관리되기 때문에 테스팅에 용이하다. 스토리북은 자체적으로 접근성, 인터렉션, 시각화 기능을 제공한다.

<b>문서화</b>

스토리는 컴포넌트와 컴포넌트의 상태를 모두 기록한다. 따라서 동료가 해당 컴포넌트를 더 유저 관점에서 직관적으로 파악할 수 있다.

## write stories once, reuse everywhere

Storybook은 ES6 기반의 모듈 명세를 따르고 있다. 따라서 스토리북을 다양한 개발, 테스팅, 디자인 도구와 연동할 수 있다.

## 설정하기 with monorepo

monorepo에서 스토리북 도입하기
storybook은 이미 설정된 프로젝트에서만 도입 가능하다.
(e.g. cra, cna 등등)

monorepo의 root에는 이러한 설정이 따로 안되어 있기 때문에 추가적으로 모노레포 환경을 구성해주어야 한다.

-   [State of JavaScript 2022: Monorepo Tools](https://2022.stateofjs.com/en-US/libraries/monorepo-tools/)

-   [모던 프론트엔드 프로젝트 구성 기법 - 모노레포 도구 편](https://d2.naver.com/helloworld/7553804)

-   [Turborepo로 모노레포 개발 경험 향상하기](https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo)

storybook을 적용할 builder 프로젝트는 이미 turborepo으로 구성이 되어 있다.

-   [Using Storybook with Turborepo – Turborepo](https://turbo.build/repo/docs/handbook/tools/storybook)

    <br/>

turbopack 공식 홈페이지에 있는 가이드를 따라 설정한다. 가이드를 따라가다 보면 storybook 내부에 필요한 설정들이 몇 개 있다.

-   global style
    -   preview.ts에 삽입했다.
-   svgr
    -   vite plugin에 svgr을 추가해준다.
    -   옵션을 잘 확인하도록.. exportAsDefault..
-   turborepo output 결과에 static-storybook 추가

## Write Stories

### Introduction

-   args이 의미하는 것은 컴포넌트의 props이다.
-   storybook은 내부적으로 Component Story Format(CSF)를 사용한다. 얘는 ES6 모듈 기반이다.

### **default export**

-   컴포넌트와 메타 데이터들을 default export 한다.

### **named export**

-   각 named export는 스토리를 의미한다.
-   네이밍 컨벤션으로는 PascalCase를 권장한다.
-   named를 나누는 기준은 따로 없다. 하지만, 공통 컴포넌트인 경우에는 피그마 디자인 kit에 나누어진 기준을 적극적으로 활용한다.

### React 훅과 함께 사용하기

-   스토리를 작성할 컴포넌트가 훅을 필요로 한다면, wrapper 컴포넌트에서 훅을 호출하면 된다.

```jsx
const ButtonWithHooks = () => {
	// Sets the hooks for both the label and primary props
	const [value, setValue] = useState('Secondary');
	const [isPrimary, setIsPrimary] = useState(false);

	// Sets a click handler to change the label's value
	const handleOnChange = () => {
		if (!isPrimary) {
			setIsPrimary(true);
			setValue('Primary');
		}
	};
	return (
		<Button primary={isPrimary} onClick={handleOnChange} label={value} />
	);
};

export const Primary: Story = {
	render: () => <ButtonWithHooks />,
};
```

### story 작성하기

스토리는 컴포넌트가 어떻게 렌더링 되어야 하는지를 기술한 함수이다. 스토리를 생성하는 가장 간결한 방식은 다양한 props를 가진 컴포넌트를 직접 렌더링 하는 것이다.

```jsx
export const Primary: Story = {
	render: () => <Button backgroundColor="#ff0" label="Button" />,
};

export const Secondary: Story = {
	render: () => <Button backgroundColor="#ff0" label="😄👍😍💯" />,
};

export const Tertiary: Story = {
	render: () => <Button backgroundColor="#ff0" label="📚📕📈🤓" />,
};
```

### args 활용하기

args를 활용하면 보일러플레이트를 제거할 수 있다.

```jsx
export const Primary: Story = {
	args: {
		backgroundColor: '#ff0',
		label: 'Button',
	},
};

export const Secondary: Story = {
	args: {
		...Primary.args,
		label: '😄👍😍💯',
	},
};

export const Tertiary: Story = {
	args: {
		...Primary.args,
		label: '📚📕📈🤓',
	},
};
```

-   다른 story의 args를 spread 연산자로 재활용할 수 있다는 장점이 있다.
-   args를 부모 컴포넌트에서 활용할 수 있기 때문에, composition 컴포넌트를 테스트하기 용이하다.
-   args를 재활용 가능한 형태로 관리하는 것은 계층적 구조를 가진 컴포넌트의 스토리를 더 유연하게 관리할 수 있다는 것을 의미한다.
-   또한 args를 설정함으로서, control addon이 활성화 된다. control을 활용하면 엣지 케이스를 찾기 더 쉽다.

## 복수의 컴포넌트 스토리 작성하기

[Stories for multiple components](https://storybook.js.org/docs/react/writing-stories/stories-for-multiple-components)

```jsx
// List.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { List } from './List';
import { ListItem } from './ListItem';

//👇 We're importing the necessary stories from ListItem
import { Selected, Unselected } from './ListItem.stories';

const meta: Meta<typeof List> = {
	component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const ManyItems: Story = {
	render: args => (
		<List {...args}>
			<ListItem {...Selected.args} />
			<ListItem {...Unselected.args} />
			<ListItem {...Unselected.args} />
		</List>
	),
};
```

### args

args는 컴포넌트의 상태를 미리 정의해둔 객체이다.

### argTypes

argTypes에 컴포넌트가 가질 수 있는 옵션을 미리 정의한다. 미리 정의해둔 옵션은 controls에서 직접 조작할 수 있다.

### docs

autodocs tag를 전역적으로 추가

control을 통해서 원하는 모습으로 설정하고 코드를 확인해서 바로 가져다 쓸 수 있다.

## live template을 활용해 생산성 향상시키기

`webstorm`의 live template을 활용해서 storybook 문서화 생산성을 향상시켜보자.

[참고문서](https://www.jetbrains.com/help/idea/creating-and-editing-live-templates.html)

```jsx
import { Meta, StoryObj } from '@storybook/react';
import $TM_FILENAME_BASE$

const meta: Meta = {
  component: $TM_FILENAME_BASE$,
  title: '$TM_FILENAME_BASE$',
};
export default meta;

type Story = StoryObj<typeof $TM_FILENAME_BASE$>;
const defaultArgs = {};
const defaultArgTypes = {};
export const Basic: Story = {};
```

```jsx
substringBefore(fileNameWithoutExtension(), '.');
```
