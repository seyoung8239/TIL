---
title: [WIP]Mac 터미널 명령어
createdAt: 2023-04-18
summary: MacOs에서 사용할 수 있는 다양한 터미널 명령어 모음
categories: [cli, terminal, commnad]
---

### kill - 프로세스에 특정 signal을 보내거나 종료

```bash
SYNOPSIS
     kill [-s signal_name] pid ...
     kill -l [exit_status]
     kill -signal_name pid ...
     kill -signal_number pid ...
```

옵션으로 시그널 번호나 시그널 이름을 전달하고 시그널을 보낼 프로세스의 pid도 같이 전달한다. 강제종료 하는 `-9`옵션이 자주 사용되지만 서비스 종료 시그널 `-15`을 사용하는 편이 더 안전하다.

### lsof - list open files

시스템에서 열려있는 파일에 대한 정보를 출력한다. `lsof -i [protocol] [port]` 옵션으로 특정 포트를 사용하는 프로세스 정보를 확인하는 용도로 자주 사용된다.

### netstat - 네트워크 상태 확인

네트워크와 관련된 여러가지 정보를 보여준다. 옵션에 따라 다양한 방식으로 데이터를 볼 수 있다.

8000번 포트로 열린 서버 확인하기

```bash
netstat -vanp tcp | grep 8000
# lsof 명령어를 사용해서 더 간단하게 처리할 수 있다.
```

### man - 명령어의 메뉴얼 확인

`man netstat`과 같이 사용할 수 있다. 텍스트 에디터 형식으로 해당 명령어에 대한 메뉴얼이 출력된다.

## Options

### -v: level of verbosity

일반적으로 적당히 중요한 정보만 추려서 출력한다. 하지만 더 자세한 정보를 알고싶다면 verbosity를 높일 수 있다.

## Meta

### synopsis

해당 커맨드를 사용하는 청사진이다. 하나의 명령을 다양한 방식으로 사용할 수 있다.

```bash
NAME
     netstat – show network status

SYNOPSIS
     netstat [-AaLlnW] [-f address_family | -p protocol]
     netstat [-gilns] [-v] [-f address_family] [-I interface]
     netstat -i | -I interface [-w wait] [-c queue] [-abdgqRtS]
     netstat -s [-s] [-f address_family | -p protocol] [-w wait]
     netstat -i | -I interface -s [-f address_family | -p protocol]
     netstat -m [-m]
     netstat -r [-Aaln] [-f address_family]
     netstat -rs [-s]
     netstat -B [-I interface]
```

### 페이지 이동

`fn + up/down` 을 활용하여 블록 내에서 이동할 수 있다. terminal 단위에서 이동하고 싶다면 `fn + shift + up/down`을 활용하면 된다.
