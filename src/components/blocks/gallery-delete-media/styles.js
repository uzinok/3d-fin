import styled from "styled-components";
import SubmitMessage from "../../ui/submit-message/submit-message";

export const StyledButtonDel = styled.button`
	appearance: none;
	position: absolute;
	left: 5px;
	top: 5px;
	z-index: 1;
	cursor: pointer;
`

export const StyledAlertMessage = styled(SubmitMessage)`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	position: fixed;
	font-size: 16px;
	width: 100%;
	box-sizing: border-box;
	z-index: 2;
`
