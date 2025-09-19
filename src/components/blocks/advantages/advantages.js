import Title from "../../ui/title/title";
import { StyledContainer } from "./styles";
import CardList from "../../layout/card-list/card-list";
import { advantages } from "../../../mocks/advantages";

function Advantages() {
	return (

		<section>
			<StyledContainer>
				<Title as='h2'>Преимущества</Title>
				<CardList list={advantages.items} />
			</StyledContainer>
		</section>
	)
}

export default Advantages;
