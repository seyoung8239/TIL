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
	padding-left: 15px;
	justify-content: space-around;
	background-color: rgba(0, 100, 0, 0.1);
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

export const searchBox = styled.div`
	position: absolute;
	top: 50px;
	width: 100%;

	background-color: #cad9cc;
	padding: 15px 25px;

	display: flex;
	flex-direction: column;
	gap: 10px;

	font-size: 14px;
	font-weight: 400;
`;
