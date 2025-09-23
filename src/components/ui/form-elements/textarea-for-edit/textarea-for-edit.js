import { StyledTextArea } from "./styles";

function TextAreaForEdit({ defaultValue, ref, placeholder, noMinHeight }) {
	return (
		<StyledTextArea
			name="text"
			placeholder={placeholder}
			defaultValue={defaultValue}
			ref={ref}
			noMinHeight={noMinHeight}
		>
		</StyledTextArea>
	)
}

export default TextAreaForEdit;
