import React from 'react';
import { css } from '@emotion/react';
import ArrowUp from '@assets/arrow-up.svg';

const STBStyle = css`
	position: fixed;
	right: 50px;
	bottom: 50px;
	z-index: 50;
	cursor: pointer;
`;

const ScrollToTopBtn = () => {
	return (
		<ArrowUp
			css={STBStyle}
			onClick={() => {
				window.scrollTo({ top: 0 });
			}}
		/>
	);
};

export default ScrollToTopBtn;
