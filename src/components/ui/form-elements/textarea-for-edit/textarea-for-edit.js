import { StyledTextArea } from "./styles";

function TextAreaForEdit({ defaultValue, ref, placeholder, noMinHeight, onInput, name }) {
	return (
		<StyledTextArea
			name={name}
			placeholder={placeholder}
			defaultValue={defaultValue}
			ref={ref}
			noMinHeight={noMinHeight}
			onInput={onInput}
		>
		</StyledTextArea>
	)
}

export default TextAreaForEdit;
