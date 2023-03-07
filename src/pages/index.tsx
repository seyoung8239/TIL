import React, { FunctionComponent } from 'react';
import SeoWrapper from '@components/@common/SeoWrapper';
import Layout from '@layouts/Layout';
import Main from '@containers/Main';
import { graphql } from 'gatsby';
import type { GraphQlMetaResType } from '@customTypes/GraphQlQueryTypes';

const IndexPage: FunctionComponent<GraphQlMetaResType> = function ({
	data: {
		site: { siteMetadata },
	},
}) {
	return (
		<SeoWrapper {...siteMetadata}>
			<Layout>
				<Main />
			</Layout>
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
	}
`;

export default IndexPage;
