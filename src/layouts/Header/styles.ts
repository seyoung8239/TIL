import styled from '@emotion/styled';
import { Link } from 'gatsby';

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

export const MainTitleContainer = styled.h1`
	font-size: 22px;
	font-family: 'Merriweather';
	line-height: 50px;
	font-weight: 700;
	width: 15%;
	flex-shrink: 0;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: 1px solid black;
`;
export const MainTitle = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const TitleImg = styled('img')`
	width: 20px;
	height: 20px;
	@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
		width: 30px;
		height: 30px;
	}
`;
export const TitleText = styled.div`
	margin-left: 5px;
	@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
		display: none;
	}
`;

export const TitleWrapper = styled.div`
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
	border-left: 1px solid black;
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 15px;
	min-width: 100px;
	width: 10%;
	@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
		display: none;
	}
`;
