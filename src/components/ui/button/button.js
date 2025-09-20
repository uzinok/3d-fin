import { StyledButton } from "./styles";

function Button({
	children,
	className,
	type,
	onClick,
	disabled
}) {
	return (
		<StyledButton
			className={className}
			type={type}
			as={type ? "button" : "a"}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</StyledButton>
	)
}

export default Button;
