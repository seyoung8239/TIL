import React, { FunctionComponent } from 'react';

interface PropsType {
	htmlString: string;
}

const HtmlRenderer: FunctionComponent<PropsType> = ({ htmlString }) => {
	return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HtmlRenderer;
