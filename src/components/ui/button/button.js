import { StyledButton } from "./styles";

function Button({ children, className, type, as, onClick }) {
	return (
		<StyledButton className={className} type={type} as={as} onClick={onClick}>
			{children}
		</StyledButton>
	)
}

export default Button;
