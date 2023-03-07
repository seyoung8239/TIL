export interface PostType {
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
	html: string;
}
