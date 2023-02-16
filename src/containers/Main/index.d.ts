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
						fields: {
							slug: string;
						};
					};
				},
			];
		};
	};
};
