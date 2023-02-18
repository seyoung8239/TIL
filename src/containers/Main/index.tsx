import React, { FunctionComponent } from 'react';
import { usePostList } from '@hooks/usePostList';
import type { GraphQlMdResType } from '@types/GraphQlQueryTypes';
import type { PostType } from '@types/Post';
import { Container } from './styles';
import { Link } from 'gatsby';

const Main: FunctionComponent = () => {
	const {
		allMarkdownRemark: { edges },
	}: GraphQlMdResType<PostType> = usePostList();

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
