import React from 'react';
import { Link } from 'gatsby';

import SearchInput from '@components/SearchInput';
import * as S from './styles';
import * as CS from '@styles/commonStyle';

import GithubIcon from '@assets/github.svg';
import NotionIcon from '@assets/notion.svg';

const Header = () => {
	return (
		<S.Header>
			<S.Title>
				<Link to="/">TIL</Link>
			</S.Title>
			<CS.Divider />
			<SearchInput />
			<CS.Divider />
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
