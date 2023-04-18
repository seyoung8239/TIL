import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

import SearchInput from '@components/SearchInput';
import * as S from './styles';

import GithubIcon from '@assets/github.svg';
import NotionIcon from '@assets/notion.svg';

interface HeaderProps {
	title?: string;
}
const Header: FunctionComponent<HeaderProps> = ({ title }) => {
	return (
		<S.Header>
			<S.MainTitle>
				<Link to="/">TIL</Link>
			</S.MainTitle>
			<S.TitleWrapper>
				{title ? <S.PostTitle>{title}</S.PostTitle> : <SearchInput />}
			</S.TitleWrapper>
			<S.IconContainer>
				<div />
				<a
					style={{ height: '24px' }}
					href="https://github.com/seyoung8239"
					target="_blank"
				>
					<GithubIcon />
				</a>
				<a
					style={{ height: '24px' }}
					href="https://www.notion.so/8fdd3048ac90498888fb991145035e4a"
					target="_blank"
				>
					<NotionIcon />
				</a>
				<div />
			</S.IconContainer>
		</S.Header>
	);
};

export default Header;
