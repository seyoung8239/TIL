export interface GraphQlMdResType<T> {
	allMarkdownRemark: {
		edges: {
			node: T;
		}[];
	};
}

export interface GraphQlMetaResType {
	data: {
		site: {
			siteMetadata: {
				author: string;
				description: string;
				siteUrl: string;
				title: string;
			};
		};
	};
}
