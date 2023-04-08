import React, {
	ReactComponentElement,
	FunctionComponent,
	ReactElement,
} from 'react';
import { Helmet } from 'react-helmet';

import GlobalStyle from '@styles/GlobalStyle';

interface PropsInterface {
	title: string;
	description: string;
	siteUrl: string;
	image?: string;
	children: ReactElement;
}

const SeoWrapper: FunctionComponent<PropsInterface> = ({
	title,
	description,
	siteUrl,
	image,
	children,
}) => {
	return (
		<>
			<Helmet>
				<title>{title}</title>

				<meta name="description" content={description} />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					httpEquiv="Content-Type"
					content="text/html;charset=UTF-8"
				/>

				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={image} />
				<meta property="og:url" content={siteUrl} />
				<meta property="og:site_name" content={title} />
			</Helmet>
			<GlobalStyle />
			<html lang="ko" />
			{children}
		</>
	);
};

export default SeoWrapper;
