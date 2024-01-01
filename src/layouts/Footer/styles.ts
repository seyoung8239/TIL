import styled from '@emotion/styled';
import * as CS from '@styles/commonStyle';

export const Footer = styled.div`
	height: 60px;
	display: flex;
	border-top: 1px solid black;
	box-sizing: border-box;
`;
export const PadLeft = styled(CS.Pad)`
	border-right: 1px solid black;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 70%;
	color: #999;
	font-size: 12px;

	border-right: 1px solid black;
`;
