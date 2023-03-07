import React, { ReactNode } from 'react';
import { FunctionComponent, ReactElement } from 'react';
import Header from '@layouts/Header';
import * as S from './styles';

interface LayoutProps {
	children: ReactNode;
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
