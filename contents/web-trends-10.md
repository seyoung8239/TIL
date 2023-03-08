---
createdAt: 2023-03-08
title: 웹 트랜드 10
summary: 메타프레임워크, 랜더링패턴, 서버리스, 모노레포, 빌드도구, 유틸리티 우선 css
categories: ['next', 'isr', 'serverless', 'monorepo', 'bun', 'tailwind']
---

## 메타 프레임워크

-   Next.js, Remix 등이 메타 프레임워크
-   CSR → SSR

## rendering pattern

-   SSR은 사실 예전부터 많이 쓰이긴 했음
-   vs SSG
-   매우 동적인 컨텐츠 혹은 사용자 인증 위주의 서비스는 SSR이 필수
-   CSR, SSR, SSG는 이제 좀 지남
-   ISR, Streaming SSR이 뜬다

### ISR

-   페이지 단위 리빌드
-   리빌드 트리거 api 사용

### streaming SSR

-   서버 사이드 렌더링의 단일 스레드 병목 현상 최적화
-   원래 컨텐츠를 한 번에 전송
    -   병목현상 발생한다. 다 완료될 때까지 기다려야함
-   streaming ssr에서 개발자가 서비스를 청크로 분할한 후 클라로 점진적 병렬전송한다

## edge에서 serverless

-   SSR, SSG 이런거 다 사용자 경험 향상이 목표
-   단일 기능을 서버리스 기능으로 배포만 하믄 됨
-   다양한 데이터센터에 있을 수 있다
-   최대한 사용자에 가까운 곳에 배포

## 자바스크립트 런타임

-   node
-   deno, bun
-   파편화 발생 ⇒ API 상호운용성을 위해 WinterCG

## 모노레포

-   예전에는 여러 개의 작은 프로젝트를 하나의 프로젝트로 관리하는 대규모 서비스에서 사용
-   작은 프로젝트라 함은 진짜 서비스부터, 패키지(함수, 컴포넌트, 서비스)까지 포함
-   대규모 뿐만 아니라 소규모 서비스, 오픈소스에서도 사용
-   사내 공유 UI, 공유 디자인 시스템, 유틸리티 등
-   그 안에서 대충 필요한거 가져오는 방식
-   vercel turborepo
    -   빌드 파이프라인 생성
    -   캐싱

## 유틸리티 우선 CSS

-   SSR 부상하며 CSS도 많이 바뀜
-   styled, emotion 같은 css in js는 이제 별로임
    -   번들크기 증가
    -   css직렬화로 인한 런타임 오버헤드

## 타입스크립트 e2e 타입 안정성

-   JS → TS로 거대한 마이그레이션이 일어나고 있다
-   타입화된 엔티티를 서버에서 클라로 연결해야한다
-   보통 rest 아님 graphQL쓴다
-   rest용 OpenAPI를 사용해서 프론트엔드 어플리케이션을 위한 타입드 스키마를 생성할 수 있다
-   rest/graphQL을 대체할 새로운 타입 안정성 API → tRPC
-   타입 스키마를 중간 생성하지 않고 백엔드에서 프론트로 모든 타입을 내보낼 수 있다
    -   그래서 모노레포 또 많이 쓰려고 하는듯?

## 빌드도구

-   webpack + cra가 강세였는데..
-   지금은 vite vs turbopack으로 가고있다

### React

-   streaming ssr
-   suspense
-   serverComponent
    -   클라에서 일부 컴포넌트 하이드레이션
