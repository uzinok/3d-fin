import { StyledContainer } from "./styles";
import Title from "../../ui/title/title";
import SubTitle from "../../ui/subtitle/subtitle";
import { socialList } from "../../../mocks/social-list";
import CardList from "../../layout/card-list/card-list";
import Hgroup from "../../layout/hgroup/hgroup";

function Socials() {
	return (
		<section>
			<StyledContainer>
				<Hgroup>
					<Title as='h2'>Хотите больше вдохновения?</Title>
					<SubTitle>Подписывайтесь на наши соцсети, чтобы первыми видеть новые работы, следить за процессом создания и перенимать лайфхаки из мира 3D-печати.</SubTitle>
				</Hgroup>
				<CardList list={socialList.items} />
			</StyledContainer>
		</section>
	)
}

export default Socials;
