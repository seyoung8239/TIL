---
createdAt: 2023-03-24
title: 컴퓨터구조 입출력장치
summary: 컴퓨터에서 입출력 장치를 사용하기 위한 다양한 장치와 방법에 대해 알아보자.
categories:
    ['computer structure', 'io', 'device controller', 'buffering', 'DMA']
---
# 장치 컨트롤러와 장치 드라이버

장치 컨트롤러와 장치 드라이버를 통해 다양한 외부 기기가 컴퓨터 내부와 어떻게 연결되고 소통하는지 알아보자

## 장치 컨트롤러

장치 컨트롤러는 다루기 까다롭다. 여기에는 크게 두 가지 이유가 있다.

### 1. 입출력 장치에는 종류가 너무 많다

키보드, 모니터, USB, 마우스, 프린터 등등 엄청나게 많은 주변 기기가 있다. 이들은 각자 다른 속도, 데이터 전송 형식을 갖고 있다. 그렇기 때문에 다양한 입출력 장치와 정보를 주고받는 방식을규격화 하기가 어렵다.

### 2. CPU와 메모리의 전송 전송률에 비해 입출력장치의 데이터 전송률은 너무 낮다

transfer rate는 기기간 데이터를 얼마나 빠르게 전송할 수 있는지를 표현하는 지표이다. CPU와 메모리의 전송 속도는 빠른데 비해 입출력기기의 전송률은 낮아 이 두 기기가 효율적으로 통신하기가 어렵다.

이 두 가지 문제를 해결하기 위해 등장한 것이 장치 컨트롤러이다. 장치 컨트롤러는 입출력 제어기, 입출력 모듈 등 다양한 이름으로 불리기도 한다.

장치 컨트롤러는 대표적으로 아래 문제들을 해결한다.

- CPU와 입출력장치 간의 통신 중계
- 오류 검출
- 데이터 버퍼링

### 데이터 버퍼링

버퍼링이란 데이터 전송률이 다른 두 개의 기기 사이의 전송 속도를 맞추기 위해 버퍼라는 임시 공간을 활용하는 기술이다. 입력을 계속 기다릴 필요 없이 적당히 버퍼에 쌓아 두었다가 한 번에 보내거나, 너무 많은 정보를 버퍼에 담아두고 출력장치의 속도에 맞추어 조금씩 데이터를 출력할 수 있다.

### 장치 컨트롤러의 내부 구조

정치 컨트롤러의 내부에는 중요한 3 개의 레지스터가 존재한다. 바로 데이터 레지스터, 상태 레지스터, 제어 레지스터이다. 

데이터 레지스터에는 CPU와 입출력 장치간 전달되는 데이터가 담기는 레지스터이다. 앞서 말한 버퍼의 역할을 한다. 최근 주고 받는 데이터가 큰 경우에는 RAM을 함께 활용하기도 한다.

상태 레지스터는 입출력장치가 입출력 작업을 할 준비가 되었는지, 입출력 작업이 완료되었는지, 입출력장치에 오류는 없는지 등의 상태 정보를 저장한다.

제어 레지스터에는 입출력 장치가 수행할 내용에 대한 제어 정보와 명령을 저장한다.

## 장치 드라이버

장치 드라이버란 장치 컨트롤러의 동작은 감지하고 제어하여 장치 컨트롤러가 컴퓨터 내부와 정보를 주고받을 수 있게 하는 프로그램이다.

장치 컨트롤러가 입출력장치를 연결하기 위한 하드웨어적 장치라면, 장치 드라이버는 입출력장치를 연결하기 위한 스포트웨어적 장치이다.

# 다양한 입출력 방법

입출력 작업을 위해 CPU는 장치 컨트롤러와 정보를 주고받아야 한다. 그 방식으로는 프로그램 입출력, 인터럽트 기반 입출력, DMA 입출력 등이 있다. 각 방식에 대해 알아보자.

## 프로그램 입출력

프로그램 입출력은 기본적으로 프로그램 명령어로 입출력 장치를 제어하는 방법이다.

프로그램 입출력에서 CPU 장치 컨트롤러에게 직접 명령을 내린다. 그러니까 장치 컨트롤러의 레지스터에 직접 접근해 값을 읽고 쓴다.

하지만 하나의 컴퓨터에는 수 많은 입출력 장치가 연결되어 있기 때문에 모든 입출력 장치 드라이버의 존재와 위치를 알고 있기는 힘들다. 그래서 사용하는 방법이 메모리 맵 입출력 그리고 고립형 입출력이다.

### 메모리 맵 입출력

메모리 맵 입출력은 메모리에 접근하기 위한 주소 공간과 입출력장치에 접근하기 위한 주소 공간을 하나의 주소 공간에서 관리하는 방법이다. 그러니까 메모리의 516번지는 프린터 컨트롤러의 데이터 레지스터로 사용하는 방법이다.

CPU가 메모리에 접근하는 방식과 입출력 장치에 접근하는 방식이 같으므로 더욱 간결하다는 장점이 있다.

### 고립형 입출력

고립형 입출력 방식은 메모리 맵 입출력 방식과 다르게 메모리 주소 공간과 입출력 주소 공간을 분리하는 방법이다.

고립형 입출력을 위해서는 시스템 버스의 제어 버스에 입출력 제어를 위한 전용 버스가 추가되어야 한다. 이 방식을 통해 메모리 주소 공간과 같은 용량의 입출력 주소 공간을 별도로 할당할 수 있다.

입출력을 위한 별도의 제어 버스가 있기 때문에 메모리 입출력에 사용되는 명령어와 같을 필요가 없다. 즉, 입출력을 위한 별도의 명령어를 사용할 수 있다

## 인터럽트 기반 입출력

입출력 장치가 CPU에게 인터럽트 요청 신호를 보내면 CPU는 하던 일을 멈추고 해당 인터럽트에 해당하는 서비스 루틴을 실행하고 완료하면 그 때 다시 하던 일로 돌아온다.

입출력 장치에 의한 하드웨어 인터럽트는 정확히 말하자면 입출력 장치가 아닌 장치 컨트롤러에 의해 발생된다.

이렇게 인터럽트 기반으로 수행하는 입출력을 인터럽트 기반의 입출력이라고 한다.

<aside>
💡 **폴링**
폴링은 인터럽트와 자주 비교되는 개념이다. 입출력장치가 작업을 완료한 후 CPU에게 인터럽트를 보내는 방식으로 작업 완료를 알린다면, 폴링방식에서는 반대로 CPU가 주기적으로 입출력 장치의 완료 여부를 직접 확인한다. 이러한 폴링 방식은 CPU에게 부담스럽다.

</aside>

우리는 컴퓨터를 사용할 때 많은 입출력 장치를 사용한다. 이때 이렇게 많은 입출력 장치로부터 인터럽트가 발생하는데, 이 때 동시에 발생한 인터럽트는 어떻게 처리해야 할까?

이런 인터럽트를 발생한 순차대로 처리하는 방법도 있지만 우선순위를 부여하여 처리하는 게 더 일반적이다.

플래그 레지스터 속 인터럽트 비트가 활성화되어 있는 경우, 혹은 인터럽트 비트를 비활성화해도 무시할 수 없는 Non-Maskable-Interrupt가 발생한 경우 CPU는 우선순위가 높은 인터럽트부터 처리하게 된다

우선순위를 반영해 다중 인터럽트를 처리하는 방식에는 여러가지가 있지만 대표적으로는 PIC라고 불리는 programmable interrupt controller를 사용한다. PIC는 여러 장치 컨트롤러에 연결되어 이 장치들이 보내는 인터럽트 요청들의 우선순위를 판별한 뒤 CPU에게 가장 우선 순위가 높은 인터럽트부터 전달하는 역할을 한다.

입출력 장치의 개수가 많은 경우 PIC를 여러 계층으로 나누어 인터럽트를 관리할 수도 있다.

## DMA 입출력

앞서 설명한 두 가지 방법의 입출력에서 데이터의 전달은 CPU가 주도하고 데이터 역시 CPU를 거쳐간다는 특징을 갖는다.

입출력 장치와 메모리 사이에 전송되는 모든 데이터가 CPU를 거치는 것은 아주 비효율적이다. 따라서 CPU를 거치지 않고 데이터를 전송할 수 있도록 하는 것이 바로 Direct Memory Access라는 기술이다. DMA 입출력을 위해서는 시스템 버스에 연결된 DMA 컨트롤러가 필요하다.

### DMA 입출력 과정

1. CPU는 DMA 컨트롤러에게 입출력 장치의 주소, 수행할 연산, 메모리의 주소 등과 같은 정보로 입출력 작업을 명령한다.
2. DMA 컨트롤러는 CPU 대신 장치 컨트롤러와 상호작용하며 작업을 수행한다. 이 때 메모리에 접근할 필요가 있으면 직접 접근한다.
3. 입출력 작업이 끝나면 DMA 컨트롤러는 CPU에게 인터럽트를 보내 작업이 종료됐음을 알린다.

CPU는 오로직 작업의 시작과 끝에만 관여하기 때문에 부담을 훨씬 줄일 수 있다.

### 입출력 버스

시스템 버스는 공용 자원이기 때문에 CPU와 DMA 사이에서 경쟁이 발생할 수 있다. 실제로 입출력 처리를 위해 CPU가 작업을 기다리는 사이클 스틸링이 발생하기도 한다.

DMA 컨트롤러는 장치 컨트롤러와 이어진 별도의 입출력 버스를 두어 문제를 해결할 수 있다.

입출력 버스는 입출력 장치와 컴퓨터 내부를 연결 짓는 통로라고 볼 수 있다.

입출력 버스에는 PCI 버스, PCI Express(PCIe)와 같은 여러 버스가 있다. 또 입출력 장치들을 PCIe버스와 연결해주는 통로인 PCIe 슬롯이 존재한다.