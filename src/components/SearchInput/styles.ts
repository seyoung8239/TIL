import styled from '@emotion/styled';

export const SearchInput = styled.div`
	flex-grow: 8;
	display: flex;
	position: relative;
`;

export const Input = styled.input`
	width: 100%;
	padding: 10px 20px;
	outline: none;
	border: 0;
	background-color: rgba(0, 100, 0, 0.1);

	font-size: 16px;
	font-weight: 400;
	font-family: 'Noto Sans KR';
`;

export const searchBox = styled.div`
	position: absolute;
	top: 50px;
	width: 100%;

	background-color: rgba(0, 100, 0, 0.05);
	padding: 15px 25px;

	display: flex;
	flex-direction: column;
	gap: 10px;

	font-size: 14px;
	font-weight: 400;
`;
