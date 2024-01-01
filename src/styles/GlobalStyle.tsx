import React, { FunctionComponent } from 'react';
import { Global, Theme, css, useTheme } from '@emotion/react';

const getDefaultStyle = ({ theme }: { theme: Theme }) => css`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'Noto Sans KR';
		color: ${theme.colors.GRAY800};
	}

	html,
	body,
	#___gatsby {
		height: 100%;
	}

	a,
	a:hover {
		color: inherit;
		text-decoration: none;
		cursor: pointer;
	}
`;

const GlobalStyle: FunctionComponent = function () {
	const theme = useTheme();

	return <Global styles={getDefaultStyle({ theme })} />;
};

export default GlobalStyle;
