import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';

const SearchInput = () => {
	const data = useStaticQuery(graphql`
		{
			fusejs {
				index
				data
			}
		}
	`);
	const [query, setQuery] = useState('');
	// console.log(data);
	// console.log(useGatsbyPluginFusejs);
	// console.log(query, data.fusejs)
	const result = useGatsbyPluginFusejs(query, data.fusejs);
	console.log(result)

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
