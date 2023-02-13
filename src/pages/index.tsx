import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from '@components/common/GlobalStyle';
import ProfileImage from '@components/main/ProfileImage';
import { graphql } from 'gatsby';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

type PropsType = {
	data: {
		allMarkdownRemark: {
			edges: [
				{
					node: {
						id: string;
						frontmatter: {
							title: string;
							summary: string;
							date: string;
							categories: string[];
						};
					};
				},
			];
		};
	};
};

const IndexPage: FunctionComponent<PropsType> = function ({
	data: {
		allMarkdownRemark: { edges },
	},
}) {
	console.log(edges);
	return (
		<Container>
			{JSON.stringify(edges)}
			<GlobalStyle />
			<ProfileImage />
		</Container>
	);
};

export default IndexPage;

export const getPostList = graphql`
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
				}
			}
		}
	}
`;
