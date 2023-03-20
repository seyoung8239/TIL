---
createdAt: 2023-03-15
title: 컴퓨터구조 명령어
summary: 명령어의 구조와 주소 지정 방식
categories: ['computer structure', 'instruction', 'addressing mode']
---
# 컴퓨터 구조: 명령어

## 소스코드와 명령어

- 소스코드 → (컴파일러) → 목적코드 → (링커) → 실행파일
- 실행파일은 0과 1로 이루어진(기계어) 명령어 집합이다
- 컴파일 언어와 인터프리터 언어의 구분은 모호하다

# 명령어의 구조

- 앞서 소스코드를 기계어로 전환하는 과정에 대해 알아봤다.
- 기계어로 작성된 명령어의 구성을 알아보자.

## 연산 코드와 오퍼랜드

- 명령어 Instruction은 연산자operator와 피연산자operand로 구성되어 있다.
- 명령어가 수행할 동작은 연산코드로 표헌한다
- 연산에 사용될 데이터 혹은 데이터의 주소는 오퍼랜드에서 나타낸다

### 오퍼랜드

- 대부분의 오퍼랜드는 메모리 혹은 레지스터 주소이다
- 그래서 오퍼랜드를 주소필드라고도 한다
- 오퍼랜드의 개수에 따라 다음과 같이 나눈다
    - 0-주소 명령어
    - 1-주소 명령어
    - 2-주소 명령어
    - 3-주소 명령어

### 연산코드

- 연산코드의 유형은 크게 아래 네 가지로 나눌 수 있다
    - 데이터 전송
    - 산술/논리 연산
    - 제어 흐름 변경
    - 입출력 제어

데이터 전송: MOVE, STORE, LOAD, PUSH, POP

산술/논리 연산

- ADD / SUBTRACT / MULTIPLY / DIVIDE
- INCREMENT / DECREMENT
- AND / OR / NOT
- COMPARE

제어흐름 변경: JUMP, CONDITIONAL JUMP, HALT, CALL, RETURN

입출력 제어: READ, WRITE, START IO, TEST IO

## 주소 지정 방식

> 오퍼랜드 필드에 값이 아닌 주소를 담는 이유는 명령어 길이 때문이다.
오퍼랜드가 많은 명령어인 경우 담을 수 있는 값의 범위는 점점 작아져 2^6밖에 안된다.
다양한 주소 지정 방식을 통해 메모리에 실제 데이터를 관리할 수 있다.
> 
- 연산에 사용할 데이터의 위치를 찾는 방법을 주소 지정 방식이라고 한다.
- 피연산자가 될 데이터가 저장된 위치를 유효 주소라고 한다.

### 즉시 주소 지정 방식

- 연산에 사용할 데이터를 오퍼랜드 필드에 직접 명시하는 방식
- 처리 가능한 데이터의 크기가 작다
- 빠르다

### 직접 주소 지정 방식

- 오퍼랜드 필드에 유효주소를 직접 명시한다
- 오퍼랜드 필드로 명시 할 수 있는 범위가 제한되어 있다

### 간접 주소 지정 방식

- 유효 주소를 담고 있는 메모리의 주소를 오퍼랜드 필드에 담는다
- 앞선 두 주소 지정 방식에 비해 활용가능한 범위가 넓다
- 메모리에 두 번 접근해야 하기 때문에 시간이 오래 걸린다

### 레지스터 주소 지정 방식

- 직접 주소 지정 방식과 비슷하다
- 오퍼랜드 필드에 유효 주소를 명시한다
- 다만 레지스터의 주소다
- 메모리 io가 없기 때문에 빠르다

### 레지스터 간접 주소 지정 방식

- 오퍼랜드 필드에 레지스터 주소를 명시한다
- 해당 레지스터는 유효주소를 가지고 있다
- 메모리에는 단 1회 접근하기 때문에 상대적으로 빠르다