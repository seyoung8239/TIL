import React, { ReactNode } from 'react';
import { FunctionComponent } from 'react';
import * as S from './styles';

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<S.Container>
			<S.Pad />
			<S.Divider />
			<S.Main>{children}</S.Main>
		</S.Container>
	);
};

export default Layout;
