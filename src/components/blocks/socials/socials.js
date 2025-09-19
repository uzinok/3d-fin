import { StyledContainer } from "./styles";
import Title from "../../ui/title/title";
import { socialList } from "../../../mocks/social-list";
import CardList from "../../layout/card-list/card-list";

function Socials() {
	return (
		<section>
			<StyledContainer>
				<Title as='h2'>Хотите больше вдохновения?</Title>
				<p>Подписывайтесь на наши соцсети, чтобы первыми видеть новые работы, следить за процессом создания и перенимать лайфхаки из мира 3D-печати.</p>
				<CardList list={socialList.items} />
			</StyledContainer>
		</section>
	)
}

export default Socials;
