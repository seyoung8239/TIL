import React, { ReactNode } from 'react';
import { FunctionComponent } from 'react';
import * as S from './styles';
import * as CS from '@styles/commonStyle';
import Header from '@layouts/Header';
import Footer from '@layouts/Footer';

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<>	
			<S.Layout>
				<CS.Pad />
				<S.Main>{children}</S.Main>
			</S.Layout>
			<Footer />
		</>
	);
};

export default Layout;
