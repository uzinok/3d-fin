import styled from "styled-components";
import Container from "../../layout/container/container";
import Decor from "../../ui/decor/decor";

export const StyledContainer = styled(Container)`
	position: relative;
`

export const StyledDecor = styled(Decor)`
	position: absolute;
	top: -150px;
	right: -150px;
	width: 300px;
	height: 300px;
	z-index: 2;

	@media (max-width: 768px) {
		display: none;
	}

	section:nth-child(4n+4) & {
		top: -100px;
		left: -100px;
		width: 200px;
		height: 200px;
	}
`

export const StyledDescription = styled.p`
	margin: 0 0 1em;
	font-size: 18px;
`
