---
title: '가장 안정적인 timer 만들기'
createdAt: 2023-08-11
summary: Web Worker를 활용하여 background tab에서도 동작하는 timer 만들기
categories: [web worker]
---

# 가장 안정적인 timer 만들기(background tab)

## Problem

멀티 브라우저 탭을 활용하는 경우 우선 순위에 따라 페이지가 inactive 상태에 놓일 수 있다. 이 경우 timer가 정상적으로 동작하지 않고 결국 추적하기 힘든 버그를 만든다.

## Background Tab

브라우저는 자원 최적화를 위해 inactive 상태의 탭에서 몇몇 api에 대해 쓰로틀링을 적용한다.

timer, audio, video와 같은 api들이 이에 해당된다. 따라서 inactive 상태에서 매초 동작하는 것이 아니라 몇 초, 심하게는 몇 분씩 싱크가 어긋날 수 있다.

### 정책

-   백그라운드 탭에서 requestAnimationFrame()을 호출하지 않는다
-   timer api를 1초 batch 실행한다
-   재생되지 않는 오디오

## 시간차를 계산해서 보정하기

```jsx
function createTimer(callback, interval) {
	let expected = Date.now() + interval;

	function tick() {
		const drift = Date.now() - expected;
		callback();

		// 보정값을 더해 다음 실행 시점 계산
		expected += interval;

		// 보정값이 음수라면 즉시 실행
		if (drift > interval) {
			tick();
		} else {
			requestAnimationFrame(tick);
		}
	}

	return tick;
}

// 타이머 시작
const timerCallback = () => {
	console.log(new Date().toISOString());
};

const timerInterval = 1000; // 1초
const timer = createTimer(timerCallback, timerInterval);
timer();
```

하지만 requestAnimationFrame API 역시 background에서 동작하지 않는다.

## Web worker 활용하기

`Web Worker`를 통해 애플리케이션의 메인 스레드가 아닌 독립적인 스레드에서 스크립트를 실행한다. 따라서 애플리케이션 탭이 inactive가 되어도 쓰로틀링이 발생하지 않는다.

`Web Worker`를 사용하는 방식은 크게 복잡하지 않다. 생성한 워커 싱글톤 인스턴스에서 1초 주기로 메시지를 전송하면, 서비스에서 해당 메시지를 받을 때마다 타이머 시간을 계산해서 업데이트 해 주면 된다.
