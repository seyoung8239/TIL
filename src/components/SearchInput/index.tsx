import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useDebounceFuseSearch } from '@hooks/useFuseSearch';
// import { useDebounceFuseSearch } from 'gatsby-use-fusejs';
import * as S from './styles';
import SearchIcon from '@assets/search.svg';
import CancelIcon from '@assets/cancel.svg';
import { useTheme } from '@emotion/react';

const SearchInput = () => {
	const { fusejs } = useStaticQuery(graphql`
		{
			fusejs {
				index
				data
			}
		}
	`);
	const [query, setQuery] = useState('');
	const result = useDebounceFuseSearch({ query, fusejs });
	const theme = useTheme();

	return (
		<S.SearchInput>
			<S.InputWrapper>
				<SearchIcon fill={theme.colors.GRAY800} />

				<S.Input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder="제목 혹은 키워드로 검색"
				/>
				{query && <CancelIcon onClick={() => setQuery('')} />}
			</S.InputWrapper>

			{!!result.length && (
				<S.SearchBox>
					{result.map(({ item }: { item: any }) => (
						<Link key={item.refIndex} to={'/post' + item.slug}>
							<S.SearchItem>
								<div>{item.title}</div>
								<div>→</div>
							</S.SearchItem>
						</Link>
					))}
				</S.SearchBox>
			)}
		</S.SearchInput>
	);
};

export default SearchInput;
