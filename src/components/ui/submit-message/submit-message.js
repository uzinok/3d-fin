import Title from "../title/title";
import styled from "styled-components";

export const colorMessage = {
	SUCCESS: '#97ff97',
	ERROR: '#ffc8c8',
}

const SubmitMessage = styled(Title)`
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

export default SubmitMessage;
