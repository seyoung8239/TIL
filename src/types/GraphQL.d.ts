export interface GraphQlResType<T> {
	allMarkdownRemark: {
		edges: {
			node: T;
		}[];
	};
}
