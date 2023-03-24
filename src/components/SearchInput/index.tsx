import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useDebounceFuseSearch } from '@hooks/useFuseSearch';
// import { useDebounceFuseSearch } from 'gatsby-use-fusejs';
import * as S from './styles';

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
			<S.Input
				type="text"
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
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
