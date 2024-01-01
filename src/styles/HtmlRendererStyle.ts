import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
	margin: 30px auto 0;

	max-width: 95%;
	min-height: 95vh;
	a {
		color: green;
		&:hover {
			text-decoration: underline;
		}
	}
	p {
		margin-bottom: 15px;
		line-height: 25px;
	}
	h1 {
		margin: 30px 0px;
	}
	h2 {
		margin: 20px 0px;
		width: 100%;
		background-color: #d5e3d3;
		line-height: 180%;
		padding-left: 5px;
	}
	h3,
	h4 {
		color: #435440;
		margin: 10px 0px;
	}
	ol,
	ul {
		margin-left: 20px;
		padding-left: 0;
		margin-bottom: 15px;
	}
	li {
		margin-bottom: 5px;
	}
`;
