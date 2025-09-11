import { StyledHeader, StyledHeaderContainer } from "./styles";

function Header({ children }) {
	return (
		<StyledHeader>
			<StyledHeaderContainer>
				{children}
			</StyledHeaderContainer>
		</StyledHeader>
	)
}

export default Header;
