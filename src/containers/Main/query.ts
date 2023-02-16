import { graphql } from 'gatsby';
import { useStaticQuery } from 'gatsby';

export const usePostList = () => {
	const { postList } = useStaticQuery(
		graphql`
			query getPostList {
				allMarkdownRemark(
					sort: {
						order: DESC
						fields: [frontmatter___date, frontmatter___title]
					}
				) {
					edges {
						node {
							id
							frontmatter {
								title
								summary
								date(formatString: "YYYY.MM.DD.")
								categories
							}
							fields {
								slug
							}
						}
					}
				}
			}
		`,
	);
	return postList;
};
