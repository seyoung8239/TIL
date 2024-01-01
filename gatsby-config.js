/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: 'TIL',
		description: '오늘 공부한 흔적들을 기록합니다.',
		author: 'seyoung8239@gmail.com',
		siteUrl: 'https://tilmain.gatsbyjs.io/',
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-typescript',
			options: {
				isTSX: true,
				allExtensions: true,
			},
		},
		`gatsby-plugin-image`,
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `contents`,
				path: `${__dirname}/contents`,
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				// This will impact how browsers show your PWA/website
				// https://css-tricks.com/meta-theme-color-and-trickery/
				// theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/assets/mainIcon.png`, // This path is relative to the root of the site.
			},
		},
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 500,
							quality: 100,
							withWebp: true,
						},
					},
					{
						resolve: 'gatsby-remark-smartypants',
						options: {
							dashes: 'oldschool',
						},
					},
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							classPrefix: 'language-',
						},
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: {},
					},
					{
						resolve: 'gatsby-remark-external-links',
						options: {
							target: '_blank',
							rel: 'nofollow',
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [`Noto+Sans+KR\: 400,600,700`],
				display: 'swap',
			},
		},
		{
			resolve: 'gatsby-plugin-fusejs',
			options: {
				// 인덱스를 만들기 위한 전체 콘텐츠 쿼리
				query: `
					{
						allMarkdownRemark {
							nodes {
								rawMarkdownBody
								frontmatter {
									title
									summary
									categories
								}
								fields {
        							slug
    							}
							}
							
						}
					}
				`,
				keys: ['title', 'summary', 'categories', 'body', 'slug'],
				normalizer: ({ data }) =>
					data.allMarkdownRemark.nodes.map(node => ({
						title: node.frontmatter.title,
						summary: node.frontmatter.summary,
						categories: node.frontmatter.categories,
						body: node.rawMarkdownBody,
						slug: node.fields.slug,
					})),
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /assets/,
				},
			},
		},
	],
};
