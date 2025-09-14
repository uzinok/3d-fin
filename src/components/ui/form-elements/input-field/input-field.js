import styled from "styled-components";

export const InputField = styled.input`
	box-sizing: border-box;
	width: 100%;
	max-width: 100%;
	height: 44px;
	padding: 12px 15px;
	font-size: inherit;
	line-height: 1;
	font-family: inherit;
	color: inherit;
	background-color: #ffffff;
	border-width: 0;
	border-radius: 6px;
	border: 1px solid ${(props) => props.invalid ? '#ff0000' : '#bbbbbb'};
	border: 1px solid ${(props) => props.valid ? '#00ff00' : '#bbbbbb'};
	resize: none;

	&:focus-visible,
	&:focus {
		outline: 1px solid #3e1f05;
		outline-offset: 2px;
	}

	&:not(:disabled):hover {
		cursor: pointer;
	}

	&:disabled {
		filter: grayscale(100%);
		opacity: 0.5;
	}
`
