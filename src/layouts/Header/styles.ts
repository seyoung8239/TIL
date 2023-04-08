import styled from '@emotion/styled';

export const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0px;
	box-shadow: 1px;
	border-bottom: 1px solid black;
	height: 50px;
	background-color: white;
	z-index: 100;
`;

export const Title = styled.h1`
	font-size: 22px;
	font-family: 'Merriweather';
	line-height: 50px;
	font-weight: 700;
	width: 15%;
	text-align: center;
`;

export const SubTitle = styled.h2`
	font-family: 'Noto Sans KR';
	font-weight: 500;
	font-size: 21px;
	font-style: italic;
`;

export const Divider = styled.div`
	width: 1px;
	background-color: black;
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	width: 15%;
`;
