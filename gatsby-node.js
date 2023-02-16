const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
	const { createPage } = actions;
	createPage({
		path: '/using-dsg',
		component: require.resolve('./src/templates/using-dsg.js'),
		context: {},
		defer: true,
	});
};

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
				['@types']: path.resolve(__dirname, 'src/types'),
				['@layouts']: path.resolve(__dirname, 'src/layouts'),
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
			allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
