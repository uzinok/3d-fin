import styled from "styled-components";

export const StyledButton = styled.a`
	display: inline-block;
	padding: 12px 24px;
	font-weight: 600;
	font-size: 16px;
	line-height: 125%;
	font-family: inherit;
	text-align: center;
	color: #fdfdfd;
	text-decoration: none;
	letter-spacing: .192px;
	background-color: #1A3E3E;
	background-image: linear-gradient(135deg, #3e1f05, #6a4e26, #c29c63, #d4b383);
	border: 0;
	border-radius: 4px;
	box-shadow: 0 3px 0 #6a4e26, 0 0 90px #ffffff;
	transition: box-shadow 0.25s ease-in-out, opacity 0.25s ease-in-out;
	appearance: none;

	@media (min-width: 768px) {
		padding: 18px 30px;
		font-size: 18px;
		border-radius: 6px;
	}

	&:not(:disabled):hover {
		box-shadow: 0 0 0 #6a4e26, 0 0 90px #ffffff;
		cursor: pointer;
	}

	&:not(:disabled):active {
		opacity: 0.7;
	}

	&:disabled {
		color: rgba(255, 255, 255, 0.5);
		box-shadow: 0 0 0 #6a4e26, 0 0 90px #ffffff;
	}

	&::before {
		content: "";
		display: inline-block;
		height: 1em;
		vertical-align: middle;
	}
`
