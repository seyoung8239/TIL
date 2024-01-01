import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import HtmlRenderer from '@components/@common/HtmlRenderer';
import { GraphQlMdResType, PostType } from '@customTypes/gql';

import GlobalStyle from '@styles/GlobalStyle';
import Layout from '@layouts/Layout';
import Header from '@layouts/Header';
import ScrollToTopBtn from '@components/ScrollToTopBtn';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';

type PostTemplateProps = {
	data: GraphQlMdResType<PostType>;
};

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
	data: {
		allMarkdownRemark: { edges },
	},
}) {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header title={edges[0].node.frontmatter.title} />
			<Layout>
				<HtmlRenderer htmlString={edges[0].node.html} />
			</Layout>
			<ScrollToTopBtn />
		</ThemeProvider>
	);
};

export const queryMarkdownDataBySlug = graphql`
	query queryMarkdownDataBySlug($slug: String) {
		allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
			edges {
				node {
					html
					frontmatter {
						categories
						summary
						createdAt(formatString: "YYYY.MM.DD.")
						thumbnail
						title
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;

export default PostTemplate;
