import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useDebounceFuseSearch } from '@hooks/useFuseSearch';

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
		<div>
			<input
				type="text"
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			<ul>
				{result.map(({ item }: { item: any }) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	);
};

export default SearchInput;
