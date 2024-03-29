---
createdAt: 2023-03-23
title: 컴퓨터구조 CPU 성능 향상 기법 
summary: CPU의 성능을 최대로 활용하기 위한 다양한 방법들을 알아보자. 멀티스레드, 파이프라이닝, ISA 등등..
categories: ['processor', 'thread', 'pipeline', 'ISA', 'RISC', 'CISC']
---
# 컴퓨터구조: CPU 성능 향상 기법

# 빠른 CPU를 위한 설계 기법

---

## 클럭

- 컴퓨터 부품들은 클럭 신호에 맞춰 동작한다
- CPU는 명령어 사이클이라는 정해진 흐름에 맞추어 명령어를 실행한다
- 클럭 속도가 높아지면 CPU는 명령어 사이클을 더 빠르게 반복한다.
- 일반적으로 클럭 속도와 CPU의 성능은 비례한다
- 클럭 속도의 단위는 Hz이다. 1초에 한 번 깜빡하면 1Hz

## 코어

- 하나의 CPU 안에 복수의 코어가 들어갈 수 있다
- 코어는 실제로 명령어를 수행하는 부품이다. (예전에는 CPU의 정의였다)
- 하나의 코어는 전통적 CPU와 같이 ALU, Control Unit, register로 구성된다
- 멀티코어에서 중요한 것은 처리할 명령어를 분배하는 방식이다

## 스레드

- 사전적 정의는 실행 흐름의 단위이다.
- 스레드에는 CPU에서 의미하는 스레드와 프로그래밍에서 사용되는 스레드가 있다
- 논리 프로세서라고 부르기도 한다

### 하드웨어 스레드

- 하나의 코어가 동시에 처리하는 명령어 단위를 의미한다
- 하나의 코어는 여러 개의 스레드를 가질 수 있다
- 인텔에서는 하이퍼스레딩이라는 단어를 사용한다

### 소프트웨어 스레드

- 하나의 프로그램에서 독립적으로 실행되는 단위이다

### 멀티스레드 프로세서

- 멀티스레드 프로세서 설계의 핵심은 레지스터이다
- 하나의 명령 흐름을 처리하기 위해서는 PC, SP, MBR, MAR 등의 레지스터가 필요하다
- 멀티스레드에서는 이런 레지스터 셋이 여러개이다

# 명령어 병렬 처리 기법

---

명령어를 동시에 처리하여 CPU의 유휴시간을 줄이는 기법이다. 대표적으로 명령어 파이프라이닝, 슈퍼스칼라, 비순차적 명려어 처리 등이 있다.

## 명령어 파이프라인

명령어 처리 과정을 아래와 같이 정리할 수 있다.

1. 명령어 인출
2. 명령어 해석
3. 명령어 실행
4. 결과 저장

중요한 것은 CPU는 각 단계가 겹치지 않는다면 동시에 실행할 수 있다는 것이다.

![https://user-images.githubusercontent.com/59970070/102009632-11467000-3d7c-11eb-854b-d698a89f0331.png](https://user-images.githubusercontent.com/59970070/102009632-11467000-3d7c-11eb-854b-d698a89f0331.png)

## 파이프라이닝 위험

### 데이터 위험

- 명령어 간 데이터 의존성에 의해 발생한다
- 현재 명령어를 실행하기 위해 이전 명령어의 결과를 필요로 하는 경우 발생

### 제어 위험

- 흐름 분기 명령어로 인해 미리 인출, 해석한 명령어가 무의미 해지는 경우
- 최근에 분기예측을 통해 제어 위험을 줄일 수 있게 되었다

### 구조적 위험

ALU, register와 같은 자원에 동시에 접근할 때 발생하는 위험

## 슈퍼스칼라

CPU 내부에 여러 개의 명령어 파이프라인을 포함한 병렬 처리 기법

## 비순차적 명령어 처리

- 데이터 위험을 관리하기 위한 처리
- 기존에는 데이터 의존성 때문에 앞의 명령어 처리를 기다려야 했다
- 하지만 뒤에 독립적인 명령을 먼저 처리하는 방식으로 효율성 증대

# CISC, RISC

---

앞서 언급한 여러가지 CPU 최적화 기법들을 적용하기 위해서는 우선 명령어가 해당 기법들에 최적화 되어야 한다.

## 명령어 집합

CPU의 종류마다 처리할 수 있는 명령어는 다르다. 특정 CPU가 처리할 수 있는 명령어의 집합을 ISA라고 한다. 즉 CPU마다 명령어가 다를 수 있다. 인텔은 x86-64 ISA를 사용한다. 애플 아이폰에 들어가는 CPU는 ARM ISA를 사용한다.

ISA가 다르면 명령어도 어셈블리어도 달라진다

## CISC

- 복잡하고 다양한 명령어를 사용한다
- 명령어의 길이가 다를 수 있다
- 다양한 주소 지정 방식을 사용한다
- 프로그램의 라인 수가 적어진다
- 복잡한 명령을 사용하기 때문에 하나의 명령이 여러 클록 동안 실행될 수 있다.
- 파이프라이닝 하기 어렵다

## RISC

- 단순하고 적은 명령어를 사용한다
- 명령어의 길이가 고정되어 있다
- 주소 지정 방식이 비교적 한정적이다
- 프로그램의 라인 수가 길어진다
- 1클럭 내외로 명령어를 수행한다
- 파이프라이닝 하기 쉽다.