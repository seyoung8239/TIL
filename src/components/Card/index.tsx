import React, { FC, FunctionComponent } from 'react';
import * as S from './styles';
import { PostType } from '@customTypes/gql';

interface propsType {
	data: Pick<PostType, 'frontmatter'>;
}

const Card: FunctionComponent<propsType> = ({ data: { frontmatter } }) => {
	const { title, summary, createdAt, categories } = frontmatter;
	return (
		<S.Card>
			<S.Title>{title}</S.Title>
			<S.CreatedAt>{createdAt}</S.CreatedAt>
			<S.Summary>{summary}</S.Summary>
		</S.Card>
	);
};

export default Card;
