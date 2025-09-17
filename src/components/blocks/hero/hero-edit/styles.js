import styled from "styled-components";
import TextArea from "../../../ui/form-elements/textarea/textarea";

export const StyledTitleTextArea = styled(TextArea).attrs(props => ({
	noMinHeight: props.$noMinHeight
}))`
	background-color: transparent;
	padding: 0;
	margin: 0;
	border: 0;
	outline: 1px solid rgba(255, 255, 255, 0.2);
`;

export const StyledSubTitleTextArea = styled(TextArea).attrs(props => ({
	noMinHeight: props.$noMinHeight
}))`
	background-color: transparent;
	padding: 0;
	margin: 0;
	border: 0;
	outline: 1px solid rgba(255, 255, 255, 0.2);
`;
