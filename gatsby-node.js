const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
	const output = getConfig().output || {};

	actions.setWebpackConfig({
		output,
		resolve: {
			alias: {
				['@components']: path.resolve(__dirname, 'src/components'),
				['@utils']: path.resolve(__dirname, 'src/utils'),
				['@hooks']: path.resolve(__dirname, 'src/hooks'),
				['@containers']: path.resolve(__dirname, 'src/containers'),
				['@customTypes']: path.resolve(__dirname, 'src/customTypes'),
				['@constants']: path.resolve(__dirname, 'src/constants'),
				['@layouts']: path.resolve(__dirname, 'src/layouts'),
				['@assets']: path.resolve(__dirname, 'src/assets'),
				['@styles']: path.resolve(__dirname, 'src/styles'),
			},
		},
	});
};

// generate a slug for each post data
exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode });
		createNodeField({ node, name: 'slug', value: slug });
	}
};

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	const queryAllMarkdownData = await graphql(`
		{
			allMarkdownRemark(sort: { frontmatter: { createdAt: DESC } }) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	// handling graphql error
	if (queryAllMarkdownData.errors) {
		reporter.panicOnBuild(`Error occured while running fetch post list`);
		return;
	}

	// import post template component
	const PostTemplateComponent = path.resolve(
		__dirname,
		'src/templates/PostTemplate.tsx',
	);

	// page generating function
	const generatePostPage = ({
		node: {
			fields: { slug },
		},
	}) => {
		const pageOptions = {
			path: `/post${slug}`,
			component: PostTemplateComponent,
			context: { slug },
		};

		createPage(pageOptions);
	};

	queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage);
};
