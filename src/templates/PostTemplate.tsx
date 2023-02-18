import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import HtmlRenderer from '@components/@common/HtmlRenderer';

import { GraphQlResType } from '@types/GraphQlQueryTypes';
import { PostType } from 'types/Post';

type PostTemplateProps = {
	data: GraphQlResType<PostType>;
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
						date(formatString: "YYYY.MM.DD.")
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
