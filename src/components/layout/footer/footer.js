import { StyledContainer } from "./styles";

function Footer() {

	return (
		<footer>
			<StyledContainer>
				<span>© {new Date().getFullYear()}</span>
			</StyledContainer>
		</footer>
	)
}

export default Footer;
