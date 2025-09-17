import { StyledTextArea } from "./styles";
import { useEffect } from "react";

function TextArea({
	name,
	placeholder,
	className,
	ref,
	onInput,
	noMinHeight = false,
	...props
}) {

	const setSizeTextArea = () => {
		if (ref?.current) {
			const minHeight = noMinHeight ? 0 : 88;
			ref.current.style.height = 'auto';
			ref.current.style.height = Math.max(ref.current.scrollHeight, minHeight) + 'px';
		}
	}

	const handleChange = () => {
		setSizeTextArea();
	}

	useEffect(() => {
		if (ref?.current) {
			setSizeTextArea();
		}

		window.addEventListener("resize", setSizeTextArea);
		return () => {
				window.removeEventListener("resize", setSizeTextArea);
		}
	});

	return (
		<StyledTextArea
			ref={ref}
			as="textarea"
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
