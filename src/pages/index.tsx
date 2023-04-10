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
			<>
				<GlobalStyle />
				<Layout>
					{edges.map(el => (
						<Card key={el.node.id} data={el.node} />
					))}
				</Layout>
			</>
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
