import React, { FunctionComponent } from 'react';
import Main from '@containers/Main';
import GlobalStyle from '@components/@common/GlobalStyle';

const IndexPage: FunctionComponent = function () {
	return (
		<>
			<GlobalStyle />
			<Main />
		</>
	);
};

export default IndexPage;
