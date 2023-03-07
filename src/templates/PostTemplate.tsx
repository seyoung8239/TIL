import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import HtmlRenderer from '@components/@common/HtmlRenderer';

import { GraphQlMdResType, PostType } from '@customTypes/gql';

type PostTemplateProps = {
	data: GraphQlMdResType<PostType>;
};

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
	data: {
		allMarkdownRemark: { edges },
	},
}) {
	return (
		<>
			<HtmlRenderer htmlString={edges[0].node.html} />
		</>
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
