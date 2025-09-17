import styled from "styled-components";
import TextArea from "../../ui/form-elements/textarea/textarea";
import Title from "../../ui/title/title";

export const StyledRow = styled.div`
	display: flex;
	gap: 20px;
	align-items: flex-end;

	@media (max-width: 767px) {
		flex-wrap: wrap;
	}
`

export const StyledLabel = styled.label`
	display: block;
	margin-bottom: 10px;
	padding-left: 15px;
`

const StyledTitle = styled(Title)``;

export const StyledTextArea = styled(TextArea)`
  background-color: transparent;
  font-family: ${StyledTitle}.font-family;
  font-size: ${StyledTitle}.font-size;
  font-weight: ${StyledTitle}.font-weight;
  color: ${StyledTitle}.color;
`;
