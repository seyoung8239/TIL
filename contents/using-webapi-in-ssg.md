---
date: '2023-02-18'
title: 'SSG/SSR 프로젝트에서 webAPI 사용하기'
categories: ['gatsby', 'webapi', 'ssg']
summary: 'SSG/SSR 프로젝트에서 webAPI 사용시 발생하는 문제점과 해결방법'
thumbnail: './test.png'
---
만약 프로젝트가 WebAPI를 사용한다면 빌드시에 에러가 날 수 있다.

빌드가 진행되는 런타임은 Node 이므로, window 객체나 다양한 webAPI를 사용할 수 없다.

이 문제를 해결하기 위해서 두 가지 해결법이 있다.

1. 조건문 사용
2. useEffect 사용

useEffect 내부의 코드는 클라이언트 렌더링 시점에 실행된다.