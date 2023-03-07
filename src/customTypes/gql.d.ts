export interface GraphQlMdResType<T> {
	allMarkdownRemark: {
		edges: {
			node: T;
		}[];
	};
}

export interface PostType {
	id: string;
	frontmatter: {
		title: string;
		summary: string;
		createdAt: string;
		categories: string[];
	};
	fields: {
		slug: string;
	};
	html: string;
}

export interface GraphQlMetaResType {
	site: {
		siteMetadata: {
			author: string;
			description: string;
			siteUrl: string;
			title: string;
		};
	};
}
