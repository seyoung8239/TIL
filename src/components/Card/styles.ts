import styled from '@emotion/styled';

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	cursor: pointer;
	border: 2px solid #444;
	padding: 25px 20px 15px;
	border-radius: 5px;
	width: 95%;
	/* transform: perspective(1px) translateZ(0); */
	transition-duration: 0.1s;

	&:hover {
		transform: scale(1.02);
	}
`;

export const Title = styled.div`
	font-size: 24px;
	font-weight: 600;
	margin-bottom: 25px;
`;

export const CreatedAt = styled.div`
	font-size: 14px;
	color: #333;
`;

export const Summary = styled.div`
	font-size: 15px;
`;

export const Categories = styled.div``;
