---
title: HTTP1.1 / 2
createdAt: 2023-03-19
summary: HTTP1.1과 HTTP2의 차이점
category: ['HTTP']
---
# 2023-02-19 :: HTTP1.1 / 2

HTTP1.1와 HTTP2의 가장 큰 차이점은 속도이다.

## HTTP 1.1의 특징

- 커넥션 하나당 한 개의 요청을 처리한다
    - 문서 내에 다양한 리소스(image, css, js)가 포함되어 있다면 그만큼 대기 시간이 길어진다.
    - 요청과 응답이 순차적으로 이루어진다
    
    ```html
    | --- a.png --- |
                    | --- b.png --- |
                                    | --- c.png --- |
    ```
    
- Head of Line Blocking이 발생할 수 있다
    - 앞 요청이 완료될 때까지 기다려야 한다
    - pipeline 기법을 통해 하나의 요청으로 여러 리소스를 요청하는 기법이 있으나 이 또한 HOL 문제가 있다
    - TCP에서 ACK를 받지 못한 경우 이전 패킷을 재전송한다. 이런 특성 때문ㅇ네 HOL 문제가 발생한다
- Round Trip Time이 증가한다
    - 매 요청별로 connection 즉 3-way handshake가 발생한다.
    - 불필요하게 시간이 소요된다
- 무거운 header
    - 매 요청마다 중복된 헤더 값을 전송한다. (헤더 + 쿠키)가 무겁다

## HTTP 1.1 문제점 개선방법

- Image spriting: 웹  페이지를 구성하는 다양한 아이콘 이미지 파일의 요청 횟수를 줄이기 위해 아이콘을 하나의 큰 이미지로 만든 후 css에서 해당 이미지의 좌표 값을 지정하여 표시하는 방법
- domain sharding: 브라우저가 여러개의 커넥션을 생성한 후 병렬적으로 요청을 처리하는 방식. 하지만 브라우저별로 도메인당 connection 개수 제한이 있기 때문에 근본적으로 해결되지는 않는다
- async, defer 옵션을 통해 브라우저의 파싱을 blocking하지 않는 방법
- Data URI Scheme: 이미지 리소스를 Base64 방식으로 인코딩 한 후 데이터로 직접 기술한다

## HTTP 2.0

프로토콜 자체에 큰 변화가 있기 보다는 성능 개선 측면에서 큰 변화가 있다

- Multiplexed streams: 커넥션 하나로 여러개의 메시지를 주고받을 수 있다. 응답은 stream 형식으로 받는다. http/1.1의 connection keep-alive, pipelining의 개선된 버전이라고 볼 수 있다
- Stream prioritization: 리소스 간의 의존관계에 따른 우선순위를 설정할 수 있다. Image보다 CSS를 먼저 로드한다던가
- Server push: 최초 요청에 담긴 리소스를 미리 요청하여 클라이언트으 요청 전에 보낸다

![https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1bade7c5-f0b3-489f-b92d-82cac3067acc/server-push-response.png](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1bade7c5-f0b3-489f-b92d-82cac3067acc/server-push-response.png)

- Header compression: HPACK 방식을 통해 헤더를 압축한다