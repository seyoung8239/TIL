import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';

interface PropsType {
	htmlString: string;
}

const ContentWrapper = styled.div`
	padding: 40px;
	width: 100%;
	min-height: 95vh;
`;

const HtmlRenderer: FunctionComponent<PropsType> = ({ htmlString }) => {
	return <ContentWrapper dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HtmlRenderer;
