import { StyledTextArea } from "./styles";

function TextArea({
	as,
	name,
	placeholder,
	className,
	ref,
	onInput,
	...props
}) {
	const handleChange = (e) => {
		e.target.style.height = 'auto';
		e.target.style.height = Math.max(e.target.scrollHeight, 44 * 2) + 'px';
	}
	return (
		<StyledTextArea
			ref={ref}
			as={as}
			name={name}
			placeholder={placeholder}
			className={className}
			onChange={handleChange}
			onInput={onInput}
			{...props}
		/>
	)
}

export default TextArea;
