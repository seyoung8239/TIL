import React, { FunctionComponent } from 'react';
import { usePostList } from '@hooks/usePostList';
import type { GraphQlResType } from '@types/GraphQL'
import type { PostType } from '@types/Post';
import { Container } from './styles';
import { Link } from 'gatsby';

const Main: FunctionComponent = () => {
	const {
		allMarkdownRemark: { edges },
	}: GraphQlResType<PostType> = usePostList();

	return (
		<Container>
			{edges.map(el => {
				const { id, fields, frontmatter } = el.node;
				return (
					<Link key={id} to={`/post${fields.slug}`}>
						{frontmatter.title}
					</Link>
				);
			})}
		</Container>
	);
};

export default Main;
