import styled from "styled-components";
import Title from "../../ui/title/title";

export const StyledForm = styled.form`
	display: grid;
	gap: 20px;

	& > *:last-child {
		margin-bottom: 0;
	}

	& > *:first-child {
		margin-top: 0;
	}
`

export const StyledTitle = styled(Title)`
	margin: 0;
`

export const FormMessage = styled(Title)`
	position: absolute;
	margin: 0;
	padding: 20px;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: #a69e93;
	border-radius: 6px;
	font-size: 1.5em;
	text-align: center;
	color: ${(props) => props.color ? props.color : "white"};
`

export const ErrorMessage = styled.span`
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

left: ${(props) => props.$coordinates ? props.$coordinates.left : "0"}px;
top: ${(props) => props.$coordinates ? props.$coordinates.top : "0"}px;
`
