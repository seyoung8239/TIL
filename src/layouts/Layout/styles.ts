import styled from '@emotion/styled';
import * as CS from '@styles/commonStyle';

export const Layout = styled.div`
	display: flex;
`;

export const Pad = styled(CS.Pad)`
	border-right: 1px solid black;
	@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
		display: none;
	}
`;

export const Main = styled.div`
	min-width: 400px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;

	div:last-child {
		border-bottom: none;
	}
`;
