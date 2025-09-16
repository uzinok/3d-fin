import { StyledErrorMessage } from "./styles";

function ErrorMessage({ children, $coordinates }) {
	return (
		<StyledErrorMessage $coordinates={$coordinates}>
			{children}
		</StyledErrorMessage>
	);
}

export default ErrorMessage;
