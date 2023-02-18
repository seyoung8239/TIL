import React, { FunctionComponent } from 'react';
import Template from '@components/@common/Template';
import Main from '@containers/Main';
import { graphql } from 'gatsby';
import type { GraphQlMetaResType } from '@types/GraphQlQueryTypes';

const IndexPage: FunctionComponent<GraphQlMetaResType> = function ({
	data: {
		site: { siteMetadata },
	},
}) {
	return (
		<Template {...siteMetadata}>
			<Main />
		</Template>
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
