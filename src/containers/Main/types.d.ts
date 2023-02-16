export interface FetchedPostListType {
	allMarkdownRemark: {
		edges: PostType[];
	};
}

export interface PostType {
	node: {
		id: string;
		frontmatter: {
			title: string;
			summary: string;
			date: string;
			categories: string[];
		};
		fields: {
			slug: string;
		};
	};
}
