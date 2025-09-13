import { StyledButton } from "./styles";

function Button({ children, className, type, as }) {
	return (
		<StyledButton className={className} type={type} as={as}>
			{children}
		</StyledButton>
	)
}

export default Button;
