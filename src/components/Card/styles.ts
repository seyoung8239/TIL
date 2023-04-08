import styled from '@emotion/styled';

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3px;
	cursor: pointer;
	border-bottom: 1.3px solid #444;
	padding: 10px 20px;
	width: 100%;
	transition-duration: 0.1s;

	&:hover {
		transform: scale(1.01);
	}
`;

export const Title = styled.div`
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 6px;
`;

export const CreatedAt = styled.div`
	font-size: 14px;
	color: #333;
`;

export const Summary = styled.div`
	font-size: 15px;
`;

export const Categories = styled.div``;
