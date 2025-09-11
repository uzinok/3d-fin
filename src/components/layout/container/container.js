import StyledContainer from "./styles";

function Container({ children, className }) {
	return (
		<StyledContainer className={className}>
			{children}
		</StyledContainer>
	)
}

export default Container;
