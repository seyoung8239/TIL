import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';

interface PropsType {
	htmlString: string;
}

const ContentWrapper = styled.div`
	padding: 40px;
	width: 100%;
	max-width: 800px;
	min-height: 95vh;
	a {
		color: green;
	}
	p {
		margin-bottom: 15px;
		line-height: 25px;
	}
	h1 {
		margin: 30px 0px;
	}
	h2 {
		margin: 20px 0px;
		width: 100%;
		background-color: #d5e3d3;
		line-height: 180%;
		padding-left: 5px;
	}
	h3,
	h4 {
		color: #435440;
		margin: 10px 0px;
	}
`;

const HtmlRenderer: FunctionComponent<PropsType> = ({ htmlString }) => {
	return <ContentWrapper dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HtmlRenderer;
