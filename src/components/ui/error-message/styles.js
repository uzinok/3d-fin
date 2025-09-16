import styled from "styled-components";

export const StyledErrorMessage = styled.span`
	background-color: rgb(231, 76, 60);
	border: 1px dashed black;
	border-radius: 5px;
	color: rgb(255, 255, 255);
	font-family: Arial;
	font-size: 14px;
	margin: 3px 0px 0px;
	padding: 3px 3px 3px;
	position: fixed;
	z-index: 9999;
	transform: translateY(-100%);
	margin-right: 30px;

	left: ${(props) => props.$coordinates ? props.$coordinates.left : "0"}px;
	top: ${(props) => props.$coordinates ? props.$coordinates.top : "0"}px;
`
