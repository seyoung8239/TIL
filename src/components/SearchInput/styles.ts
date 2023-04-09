import styled from '@emotion/styled';

export const SearchInput = styled.div`
	flex-grow: 7;
	display: flex;
	position: relative;
`;

export const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0px 15px;
	justify-content: space-around;
	background-color: #d8ebd5;
	svg:hover:last-child {
		color: #111;
		cursor: pointer;
	}
`;

export const Input = styled.input`
	flex-grow: 1;
	padding: 10px 20px;
	outline: none;
	border: 0;
	background-color: rgba(255, 255, 255, 0);

	font-size: 16px;
	font-weight: 400;
	font-family: 'Noto Sans KR';
`;

export const SearchBox = styled.div`
	box-sizing: content-box;
	position: absolute;
	top: 50px;
	width: 100%;

	background-color: #a8c2a5;
	border-right: 1px solid black;

	display: flex;
	flex-direction: column;
	font-size: 16px;
	font-weight: 500;
`;

export const SearchItem = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	border-bottom: 1px solid black;
	padding: 12px 15px;
	&:hover {
		color: #d8ebd5;
	}
`;
