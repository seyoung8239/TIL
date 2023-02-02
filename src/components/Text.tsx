import React from 'react';

type propsType = {
	text: string;
};

const Text = ({ text }: propsType) => {
	return <div>{text}</div>;
};

export default Text;
