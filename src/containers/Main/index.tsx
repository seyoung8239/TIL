import React, { FunctionComponent } from 'react';
import { usePostList } from '@hooks/usePostList';
import type { FetchedPostListType } from './types';
import { Container } from './styles';
import { Link } from 'gatsby';

const Main: FunctionComponent = () => {
	const {
		allMarkdownRemark: { edges },
	}: FetchedPostListType = usePostList();

	return (
		<Container>
			{edges.map(el => {
				const { id, fields, frontmatter } = el.node;
				return (
					<Link key={id} to={fields.slug}>
						{frontmatter.title}
					</Link>
				);
			})}
		</Container>
	);
};

export default Main;
