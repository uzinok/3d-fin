import { StyledContainer } from "./styles";
import Title from "../../ui/title/title";
import { socialList } from "../../../mocks/social-list";
import CardList from "../../layout/card-list/card-list";

function Socials() {
	return (
		<section>
			<StyledContainer>
				<Title as='h2'>Больше нашего творчества в соцсетях</Title>
				<p>Подписывайтесь, чтобы быть в курсе новых работ и идей!</p>
				<CardList list={socialList.items} />
			</StyledContainer>
		</section>
	)
}

export default Socials;
