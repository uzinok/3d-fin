import styled from "styled-components";

export const InputField = styled.input.attrs(props => ({
	className: props.className,
	...props
}))`
	--input-height: 44px;
	box-sizing: border-box;
	width: 100%;
	max-width: 100%;
	height: var(--input-height);
	padding: 12px 15px;
	font-size: inherit;
	line-height: 1;
	font-family: inherit;
	color: #3e1f05;
	background-color: #ffffff;
	border-width: 0;
	border-radius: 6px;
	border: 1px solid transparent;
	resize: none;

	&.invalid {
		border: 1px solid #ff0000;
	}

	&.valid {
		border: 1px solid #00ff00;
	}

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
