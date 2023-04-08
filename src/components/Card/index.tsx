import React, { FC, FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import * as S from './styles';
import { PostType } from '@customTypes/gql';

interface propsType {
	data: Pick<PostType, 'frontmatter' | 'fields'>;
}

const Card: FunctionComponent<propsType> = ({
	data: { frontmatter, fields },
}) => {
	const { title, summary, createdAt, categories } = frontmatter;
	const handleClickCard = () => {
		navigate('/post' + fields.slug);
	};
	return (
		<S.Card onClick={handleClickCard}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<S.Title>{title}</S.Title>
				<S.CreatedAt>{createdAt}</S.CreatedAt>
			</div>
			<S.Summary>{summary}</S.Summary>
		</S.Card>
	);
};

export default Card;
