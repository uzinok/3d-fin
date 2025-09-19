import Header from "../../layout/header/header";
import { StyledContainer, StyledLink, StyledContent } from "./styles";
import Title from "../../ui/title/title";

function Admin() {

	return (
		<>
			<Header>
				<StyledLink to="/">Главная</StyledLink>
				<button>Выход</button>
			</Header>
			<StyledContainer>
				<Title>
					Добро пожаловать в панель администратора!
				</Title>
			</StyledContainer>
			<StyledContent>
			</StyledContent>
		</>
	);
}

export default Admin;
