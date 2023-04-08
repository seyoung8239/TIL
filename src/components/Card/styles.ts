import styled from '@emotion/styled';

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3px;
	cursor: pointer;
	border-bottom: 1.3px solid #444;
	padding: 25px 20px 15px;
	width: 95%;
	transition-duration: 0.1s;

	&:hover {
		transform: scale(1.02);
	}
`;

export const Title = styled.div`
	font-size: 26px;
	font-weight: 600;
	margin-bottom: 20px;
`;

export const CreatedAt = styled.div`
	font-size: 14px;
	color: #333;
`;

export const Summary = styled.div`
	font-size: 15px;
`;

export const Categories = styled.div``;
