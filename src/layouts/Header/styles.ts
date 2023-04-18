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

export const MainTitle = styled.h1`
	font-size: 22px;
	font-family: 'Merriweather';
	line-height: 50px;
	font-weight: 700;
	width: 15%;
	text-align: center;
`;

export const TitleWrapper = styled.div`
	border-left: 1px solid black;
	border-right: 1px solid black;
	flex-grow: 7;
`;

export const PostTitle = styled.h1`
	font-family: 'Merriweather';
	font-size: 22px;
	line-height: 50px;
	font-weight: 500;
	width: 100%;
	padding-left: 20px;
	text-align: left;
`;

export const IconContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 15px;
	min-width: 100px;
	width: 10%;
`;
