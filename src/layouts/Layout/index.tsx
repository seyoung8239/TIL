import React, { ReactNode } from 'react';
import { FunctionComponent } from 'react';
import * as S from './styles';
import * as CS from '@styles/commonStyle';

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<S.Layout>
			<CS.Pad />
			<CS.Divider />
			<S.Main>{children}</S.Main>
		</S.Layout>
	);
};

export default Layout;
