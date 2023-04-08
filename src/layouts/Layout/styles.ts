import styled from '@emotion/styled';

export const Layout = styled.div`
	display: flex;
`;

export const Divider = styled.div`
	background-color: black;
	width: 1px;
`;

export const Main = styled.div`
	width: 85%;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;

	div:last-child {
		border-bottom: none;
	}
`;
