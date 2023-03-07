---
createdAt: '2023-02-16'
title: 'TS type only import'
categories: ['TypeScript', 'type only import']
summary: '외부에서 타입을 가져와 사용할 때 반드시 알아야할 type only import'
thumbnail: './test.png'
---
타입스크립트에서 다른모듈에서 타입만 import 혹은 export할 때 사용한다

### what is type only import/export
type only import/export는 TS 3.8에서 처음 소개된 명세이다

말 그래도 타입만 import, export하는 문법이다

이 문법은 런타임에 사용하지 않는 import / export 구문을 명시하는 역할을 한다

특정 모듈로부터 타입만 import하는 경우 해당 코드는 컴파일 과정에서 불필요하다 판단되어 삭제된다. 하지만 기존에 타입만 import한 코드가 ts compile 이후에도 남아있는 경우가 있다.

type only import/export 문법을 사용하면 컴파일 타임에 확실히 해당 import/export문이 삭제된다. 또한 더 명시적으로 타입을 관리할 수 있다는 장점이 있다