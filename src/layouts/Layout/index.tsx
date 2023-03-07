import React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import Header from '@layouts/Header';
import * as S from './styles';

interface LayoutProps {
	children: ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<S.Container>{children}</S.Container>
		</>
	);
};

export default Layout;
