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
