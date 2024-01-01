import React, { FunctionComponent } from 'react';
import SeoWrapper from '@components/@common/SeoWrapper';
import Layout from '@layouts/Layout';
import { graphql } from 'gatsby';
import type {
	GraphQlMdResType,
	GraphQlMetaResType,
	PostType,
} from '@customTypes/gql';
import Card from '@components/Card';
import GlobalStyle from '@styles/GlobalStyle';
import Header from '@layouts/Header';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';

interface PropsType {
	data: GraphQlMetaResType & GraphQlMdResType<PostType>;
}

const IndexPage: FunctionComponent<PropsType> = function ({
	data: {
		site: { siteMetadata },
		allMarkdownRemark: { edges },
	},
}) {
	return (
		<SeoWrapper {...siteMetadata}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Header />
				<Layout>
					{edges.map((el, i) => (
						<Card
							key={el.node.id}
							data={el.node}
							isLast={i === edges.length - 1}
						/>
					))}
				</Layout>
			</ThemeProvider>
		</SeoWrapper>
	);
};

export const getMetaData = graphql`
	query getMetaData {
		site {
			siteMetadata {
				author
				description
				siteUrl
				title
			}
		}
		allMarkdownRemark(sort: { frontmatter: { createdAt: DESC } }) {
			edges {
				node {
					id
					frontmatter {
						title
						summary
						createdAt(formatString: "YYYY.MM.DD.")
						categories
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;

export default IndexPage;
