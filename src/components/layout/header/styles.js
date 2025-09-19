import styled from "styled-components";
import Container from "../container/container";

export const StyledHeader = styled.header`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 65px;
	color: #fff;
`

export const StyledHeaderContainer = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px!important;
`
