import { Link } from "react-router-dom";
import { StyledContainer } from "./styles";

function Footer() {

	return (
		<footer>
			<StyledContainer>
				<span>© {new Date().getFullYear()}</span>
				<Link to="/admin">Админка</Link>
			</StyledContainer>
		</footer>
	)
}

export default Footer;
