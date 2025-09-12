import styled from "styled-components";

export const StyledIcon = styled.a`
	display: inline-flex;
	align-items: center;
	color: inherit;
	text-transform: uppercase;
	text-decoration: none;
	transition: opacity 0.25s ease-in-out;

	&[href]:hover {
		opacity: 0.8;
	}

	&[href]:active {
		opacity: 0.6;
	}

	&::before {
		content: '';
		display: block;
		width: 25px;
		height: 25px;
		margin-right: 10px;
		background-image: linear-gradient(135deg, #3e1f05, #6a4e26, #c29c63, #d4b383);
		mask-position: center;
		mask-size: contain;
		mask-repeat: no-repeat;
		${(props) => {
		const icon = props.$icon;
		return `mask-image: url('${icon}');`;
	}}}
`
