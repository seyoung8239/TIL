import React, { FunctionComponent } from 'react';

type propsType = {
	text: string;
};

const Text: FunctionComponent<propsType> = ({ text }) => {
	return <div>{text}</div>;
};

export default Text;
