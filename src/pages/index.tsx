import React, { FunctionComponent } from 'react';
import SeoWrapper from '@components/@common/SeoWrapper';
import Main from '@containers/Main';
import { graphql } from 'gatsby';
import type { GraphQlMetaResType } from '@types/GraphQlQueryTypes';

const IndexPage: FunctionComponent<GraphQlMetaResType> = function ({
	data: {
		site: { siteMetadata },
	},
}) {
	return (
		<SeoWrapper {...siteMetadata}>
			<Main />
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
