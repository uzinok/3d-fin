import Header from "../../layout/header/header";
import { StyledContainer, StyledLink, StyledContent } from "./styles";
import Title from "../../ui/title/title";
import UploadFile from "./upload-file/upload-file";
import Container from "../../layout/container/container";

function Admin() {

	return (
		<>
			<Header>
				<StyledLink to="/">Главная</StyledLink>
				<button>Выход</button>
			</Header>
			<main>
				<StyledContainer>
					<Title>
						Добро пожаловать в панель администратора!
					</Title>
				</StyledContainer>
				<StyledContent>
					<Container>
						<Title>Сувениры и подарки</Title>
						<UploadFile />
					</Container>
				</StyledContent>
			</main>
		</>
	);
}

export default Admin;
