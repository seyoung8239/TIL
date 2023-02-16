---
date: '2023-02-14'
title: 'Gatsby에서 slug를 활용해 SEO하기'
categories: ['gatsby', 'seo', 'slug']
summary: '포스팅의 키워드로 slug만들어 검색엔진을 최적화 해보자'
thumbnail: './test.png'
---
- **slug는 핵심 키워드의 조합이라는 의미를 갖는다**
- 웹에서는 페이지 혹은 포스트를 설명하는 핵심 키워드의 집합이라는 의미를 갖는다
- SSG에서 여러 문장부호와 띄워쓰기를 대체하여 Slug를 생성해준다
- e.g. "What is Cookie and Session?" → "what-is-cookie-and-session”

## slug를 사용하는 이유는?

검색 엔진 최적화를 위해 slug를 사용한다

slug를 활용해 게시글 링크를 만들면 URL이 조금 더 의미 있는 단어의 구성이된다

**URL이 의미 있는 단어로 구성되어 있다면 더 상위권의 검색 결과에 노출된다.**

### 마크다운 데이터에 Slug 필드 추가하기

Gatsby에는 Slug를 위한 다양한 API를 제공한다

`onCreateNode`는 특정 노드에 필드를 추가하는 기능을 구현할 수 있다

`gatsby-node.js`를 아래와 같이 수정한다

```jsx
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  });
};

// Generate a Slug Each Post Data
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({ node, name: 'slug', value: slug });
  }
};
```

하단의 `onCreateNode` API를 확인하면 마크다운 데이터에 한해서 Slug 필드를 추가하고 있다.

slug필드의 값은 마크다운 파일의 경로와 파일명을 통해 만들어진다.

slug필드의 값은 아래와 같은 graphQL 쿼리를 통해 불러올 수 있다

```graphql
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

## Slug 데이터로 포스트 아이템 링크 연결하기

이번 챕터에서는 이전에 생성한 slug 데이터를 통해 각 포스트 아이템에 링크를 연결 해보자.

먼저 메인 페이지의 컴포넌트에서 Slug 데이털르 추가로 불러와야한다

```jsx
const PostList: FunctionComponent<PostListProps> = function ({
  selectedCategory,
  posts,
}) {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  )

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostList
```

위와 같이 slug를 경로로 사용할 수 있다

모든 게시글의 레이아웃은 동일하므로 모든 slug경로에 대해 같은 템플릿을 제공할 수 있다

이 경우에는 동적 페이지 경로를 활용한다. `Next.js`의 경우에는 pages 디렉터리 아래에 `[slug].js` 파일을 통해 구현할 수 있겠지만, 

Gatsby에서는 공통적으로 사용할 템플릿 컴포넌트를 활용해야 한다.

```jsx
// src/templates/post_template.tsx
import React, { FunctionComponent } from 'react'

type PostTemplateProps = {}

const PostTemplate: FunctionComponent<PostTemplateProps> = function (props) {
  console.log(props)

  return <div>Post Template</div>
}

export default PostTemplate
```

## 템플릿 컴포넌트로 게시글 페이지 생성하기

앞서 만든 템플릿 컴포넌트를 통해 gatsby-node.js 파일 내에서 게시글 페이지를 생성해주는 부분을 구현해보자

이를 위해서는 Gatsby의 createPages API를 활용하면 된다

```jsx
exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	const queryAllMarkdownData = await graphql`
		{
			allMarkdownRemark(
				sort: {
					order: DESC
					fields: [frontmatter___date, frontmatter___title]
				}
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`;

	// handling graphql error
	if (queryAllMarkdownData.errors) {
		reporter.panicOnBuild(`Error while running query`);
		return;
	}

	// import post template component
	const PostTemplateComponent = path.resolve(
		__dirname,
		'src/templates/post_template.tsx',
	);

	// page generating function
	const generatePostPage = ({
		node: {
			fields: { slug },
		},
	}) => {
		const pageOptions = {
			path: slug,
			component: PostTemplateComponent,
			context: { slug },
		};

		createPage(pageOptions);
	};

	queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage);
};
```

- path 객체를 활용해서 템플릿 컴포넌트를 불러온다
- Gatsby에서 다이나믹 라우팅을 활용하기 위해 `createPage`라는 API를 활용한다
- `createPage`의 인자로 경로, 컴포넌트, props 등의 옵션을 건네준다

## createPage API의 파라미터

저번 챕터에서 Gatsby의 API인 createPage 함수의 파라미터로 pageOptions 객체를 넘겨주었다.

해당 객체에는 페이지 링크, 템플릿 컴포넌트, context 세 가지의 프로퍼티가 있었다. context라는 이름으로 넘긴 객체 내의 값들은 컴포넌트에서 Props로 받을 수 있을 뿐만 아니라 GraphQL Query의 파라미터로도 받을 수 있다

이번 챕터에서는 파라미터로 받은 slug를 활용해 그에 맞는 마크다운 데이터를 요청하는 쿼리를 작성하자

## GraphQL query에서 파라미터 받기

Query 내에서 사용하기 위한 파라미터 이름은 필드 이름과 구분하기 위해 `$`와 같은 접두사를 붙인다

또한 context 객체 내의 프로퍼티와 동일한 이름으로 파라미터 이름을 설정한다

slug라는 이름으로 값을 전달했으니 Query에서는 `$slug`라는 이름으로 파라미터를 받으면 된다

아래와 같이 Query 내에서 파라미터를 받을 수 있다

```graphql
query queryMarkdownDataBySlug($slug: string) { ... }
```

필터를 통해 마크다운 데이터의 slug 값과 파라미터 값이 일치하는 데이터를 가져오면 된다

필터를 사용하는 부분은 graphiQL IDE를 활용할 수 있다

```graphql
query queryMarkdownDataBySlug($slug: string) {
	allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}){
		edges {
			node {
				html
				frontmatter {
					title
					summary
					date(formatString: "YYYY.MM.DD.")
					categories
					...
				}
			}
		}
	}
}
```

## 템플릿 컴포넌트에서 Query 코드 작성하기