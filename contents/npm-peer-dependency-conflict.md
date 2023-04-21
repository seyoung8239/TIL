---
title: (번역)npm peer dependency confilct
createdAt: 2023-04-22
summary: npm을 사용하며 겪은 peer dependency conflict 문제를 해결하는 5가지 방법
categories: [npm]
---

원문: [https://levelup.gitconnected.com/how-to-fix-the-npm-conflicting-peer-dependency-error-fe5527f629a4](https://levelup.gitconnected.com/how-to-fix-the-npm-conflicting-peer-dependency-error-fe5527f629a4)

npm으로 프로젝트를 관리하면 “conflicting peer dependency”문제를 종종 마주친다. 이번 글에서 peer dependency conflict가 발생하는 원인과 그 해결 방법에 대해 알아보자.

## Peer Dependency란?

npm에서 peer dependency란 한 패키지가 다른 패키지에 대해 의존성을 갖지만 설치시에 포함되지 않는 것을 의미한다.

peer dependency는 package.json의 peerDependenies 부분에 명시되어 있다. 이러한 매커니즘은 npm 플러그인을 빌드할 때 유리하다. peer dependency를 사용하면 npm 모듈은 다음과 같이 말한다. “나는 x.y.z 버전의 패키지에서만 사용 가능하니까 나를 설치할 때 호완성을 확인해줘”

npm 4-6 버전부터 npm은 peerDependencies를 자동으로 설치하는 것을 막았다. 이는 당시 의존성 중복 문제를 해결할 방법이 없었기 때문이다. 하지만 7 버전부터 새로운 알고리즘이 적용되어 이제는 자동으로 peerDependencies를 설치한다.

### “conflicting peer dependency” 문제가 발생하는 원인은?

이 에러는 두 가지 이상의 패키지가 동일한 패키지의 다른 버전을 의존할 때 발생한다. 예를 들면 A패키지는 peer dependency의 1.0.0 버전을 의존하고, B 패키지는 peer dependency의 2.0.0를 의존하는 경우이다. 이 때 npm은 의존성 충돌을 해결하지 못하고 에러를 밠생시킨다.

## 문제 해결하기

### 1. 필요한 peer dependency 직접 설치하기

peer dependency간의 의존성이 꼬이는 경우 npm에서 에러를 발생한다. 그렇기 때문에 그냥 peer dependency를 명시적으로 설치하여 해결할 수 있다.

```bash
npm install <package>@<version>
```

### 2. 충돌이 발생한 패키지 업데이트하기

보통 peer dependency는 특정 버전 이상을 요구한다. 그렇기 떄문에 패키지의 최신 버전을 설치함으로써 충돌을 해결할 수 있다. 먼저 터미널의 에러 메시지를 확인하고, 요구하는 버전을 만족하도록 패키지를 업데이트하면 된다.

패키지의 버전을 업데이트 함으로써 또 다른 문제가 발생할 수 있다. 이 점을 항상 유의하자

### 3. `—legacy-peer-deps` 옵션 사용하기

가장 권장 되는 해결방법은  `—legacy-peer-deps` 옵션을 사용하는 것이다. 이 옵션은 npm 7버전에서 처음 소개되었으며, 일단 peer dependency를 무시하고 설치하는 방법이다. 이 옵션은 npm7버전의 아래와 같은 특성 때문에 등장했다.

- 자동으로 peer dependency를 설치함
- npm 모듈은 반드시 peer dependency의 특정 버전을 명시해야 함

이러한 특성은 npm 7버전이 그 이전 버전에 비해 더 엄격하다는 것을 의미한다. 그리고 이러한 이유로 “conflicting peer dependency”가 발생한다.

매번 패키지를 설치할 때마다 이런 옵션을 지정하는게 힘들다면 `.npmrc` 파일에 아래와 같은 옵션을 부여해 `npm install` 명령시 기본 옵션으로 설정할 수 있다.

```bash
legacy-peer-deps=true
```

### 4. npm 대신 yarn 사용하기

yarn은 npm의 대안이 되는 패키지 매니저의 한 종류이다. 특히 yarn은 npm에 비해 충돌을 해결하는데 더 특화되어 있다. 따라서 yarn을 통해 패키지를 관리하는 것은 좋은 해결방법이다.

```bash
npm install -g yarn
yarn install
```

### 5. clean up npm

가끔은 npm의 캐시가 문제가 될 수 있다. 만약 위에서 소개한 모든 방법이 적용되지 않는다면 캐시를 정리하는 것이 좋은 방법이 된다. 아래 방법을 따라가보자.

1. `node_modules` 폴더 제거
2. `package-lock.json` 삭제
3. npm 캐시 삭제

```bash
npm cache clean --force
```

1. 패키지 재설치