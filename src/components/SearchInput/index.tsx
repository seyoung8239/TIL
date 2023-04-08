import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useDebounceFuseSearch } from '@hooks/useFuseSearch';
// import { useDebounceFuseSearch } from 'gatsby-use-fusejs';
import * as S from './styles';
import SearchIcon from '@assets/search.svg';

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

	return (
		<S.SearchInput>
			<S.InputWrapper>
				<SearchIcon />
				<S.Input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>
			</S.InputWrapper>

			{!!result.length && (
				<S.searchBox>
					{result.map(({ item }: { item: any }) => (
						<div key={item.id}>{item.title}</div>
					))}
				</S.searchBox>
			)}
		</S.SearchInput>
	);
};

export default SearchInput;
