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
		title: `My TIL Blog`,
		description: `light blog I write down what I learn today`,
		author: `@seyoung8239`,
		siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
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
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
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
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
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
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 768,
							quality: 100,
							withWebp: true,
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
	],
};
