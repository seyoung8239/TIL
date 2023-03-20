import styled from '@emotion/styled';

export const SearchInput = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
	position: relative;
	/* margin-bottom: 50px; */
	border-bottom: 2px solid rgba(14, 54, 11, 0.8);
`;

export const Input = styled.input`
	width: 40%;
	padding: 10px 20px;
	outline: none;
	border: 0;
	background-color: rgba(0, 100, 0, 0.1);
	/* border-radius: 10px 10px 0 0; */

	font-size: 16px;
	font-weight: 400;
	font-family: 'Noto Sans KR';
`;

export const searchBox = styled.div`
	width: 40%;
	position: absolute;
	top: 44px;

	background-color: rgba(0, 100, 0, 0.05);
	padding: 15px 25px;
	/* border-radius: 0 0 10px 10px; */

	display: flex;
	flex-direction: column;
	gap: 10px;

	font-size: 14px;
	font-weight: 400;
	/* font-family: 'Noto Sans KR'; */
`;
