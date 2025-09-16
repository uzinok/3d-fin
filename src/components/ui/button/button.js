import { StyledButton } from "./styles";

function Button({
	children,
	className,
	type,
	as,
	onClick,
	disabled
}) {
	return (
		<StyledButton
			className={className}
			type={type}
			as={as}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</StyledButton>
	)
}

export default Button;
