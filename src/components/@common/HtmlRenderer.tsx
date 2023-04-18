import React, { FunctionComponent } from 'react';
import { ContentWrapper } from '@styles/HtmlRendererStyle';

interface PropsType {
	htmlString: string;
}

const HtmlRenderer: FunctionComponent<PropsType> = ({ htmlString }) => {
	return <ContentWrapper dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HtmlRenderer;
