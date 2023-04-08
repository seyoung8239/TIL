---
createdAt: '2023-02-18'
title: 'Gatsby에서 meta tag를 통해 seo하기'
summary: 검색 최적화를 위한 여러가지 기술들을 알아보자
categories: ['gatsby', 'seo', 'meta tag']
---
## SEO에서 Meta 태그가 가지는 중요성

- 만든 사이트의 여러 정보를 표현하는 태그
- 검색 엔진이 처리할 수 있도록 데이터 제공
- 사용자에게 어떤 사이트인지 알려줌
- SNS에서 링크를 공유했을 때 부가적인 정보 표현

![스크린샷 2023-02-14 오후 3.04.06.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d94761a9-4d82-4021-9e0a-2774ac86e288/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-02-14_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.04.06.png)

### React-Helmet

React 서비스에서 HTML 파일을 작성하듯이 meta tag를 추가할 수 있다

```html
<meta name="description" content="항상 발전하기 위해 노력하는 주니어 개발자입니다." />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
```

### Meta tag의 종류

1. **Title**

일반벅인 메타 태그의 형식은 아니지만 해당 페이지의 제목을 나타내므로 SEO에서 가장 중요한 역할을 한다

1. **Description**

해당 페이지의 설명을 확인할 수 있다

1. **Viewport**

검색 엔진에서 모바일 친화성을 아주 중요하게 보는데, 이를 위한 태그이다

1. **Content Type**

브라우저가 데이터를 어떻게 읽을지 결정한다

1. **Social Meta Tag**

여러 SNS 서비스를 위한 Meta Tag이다

대부분 Open Graph Data를 나타내는 Meta 태그를 사용한다

```html
<!-- Open Graph Data -->
<meta property="og:title" content="WebStie Title" />
<meta property="og:type" content="article" />
<meta property="og:url" content="<http://www.my-website.com/>" />
<meta property="og:image" content="<http://www.img.com/>" />
<meta property="og:description" content="WebSite Description" />

<!-- Meta for facebook -->
<!-- 페이스북과 연결해 통계를 확인할 수 있다 -->
<meta property="fb:app_id" content="Application ID" />
<meta property="fb:admins" ... />
```

이외에도 크롤러의 동작을 제어하는 Robots 그리고 키워드를 나타내는 Keywords 등의 메타 태그가 존재한다

## Template 컴포넌트에서 Meta 태그 작성하기

각 페이지에 Meta 태그를 작성할 필요 없이 template 컴포넌트에서 전체적으로 메타 태그를 관리하여 중복을 피할 수 있다

각 페이지의 메타데이터를 template 컴포넌트의 props으로 전달한 뒤 해당 데이터를 통해 meta 태그를 작성할 수 있다

Meta 태그를 작성하기 위해 props로 받을 데이터는 페이지 제목, 설명, 주소, 이미지 링크이다

```jsx
...
const Template = () => {
	return (<>
		<Container>
			<Helmet>
				<title>이 페이지의 제목<title>
				
				<meta name="description" content="이 페이지에 대한 설명" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
				...
			</Helmet>
		</Container>
	</>)
}
```

## 메인 페이지 컴포넌트에서 데이터 전달하기

메인 페이지 컴포넌트에서 Template 컴포넌트로 메타 데이터를 전달해보자.

그 전에 `gatsby-config.js`에서 `siteMetadata` 프로퍼티를 통해 GraphQL로 메타 데이터를 쿼리할 수 있게 설정하자

```jsx
module.exports = {
	siteMetadata: {
		title: 'TIL',
		description: '오늘 공부한 흔적들을 기록합니다.',
		author: 'seyoung8239',
		siteUrl: '',
	},
	...
}
```

이제 메인 페이지 컴포넌트에서 쿼리를 작성한다.
