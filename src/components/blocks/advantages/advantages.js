import Title from "../../ui/title/title";
import { StyledContainer } from "./styles";
import CardList from "../../layout/card-list/card-list";
import { advantages } from "../../../mocks/advantages";
import Hgroup from "../../layout/hgroup/hgroup";

function Advantages() {
	return (

		<section>
			<StyledContainer>
				<Hgroup>
					<Title as='h2'>Преимущества</Title>
				</Hgroup>
				<CardList list={advantages.items} />
			</StyledContainer>
		</section>
	)
}

export default Advantages;
