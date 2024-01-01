import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

import SearchInput from '@components/SearchInput';
import * as S from './styles';

import mainIcon from '@assets/mainIcon.png';
import GithubIcon from '@assets/github.svg';
import NotionIcon from '@assets/notion.svg';

interface HeaderProps {
	title?: string;
}
const Header: FunctionComponent<HeaderProps> = ({ title }) => {
	return (
		<S.Header>
			<S.MainTitleContainer>
				<S.MainTitle to="/">
					<S.TitleImg src={mainIcon} alt="main-icon" />
					<S.TitleText>TIL</S.TitleText>
				</S.MainTitle>
			</S.MainTitleContainer>
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
