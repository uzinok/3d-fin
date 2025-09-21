import { StyledHero, StyledHeroContainer, StyledHeroTitle } from "./styles";
import SubTitle from "../../ui/subtitle/subtitle";
import Button from "../../ui/button/button";
import Hgroup from "../../layout/hgroup/hgroup";

function Hero({ onOpen }) {
	return (
		<StyledHero>
			<StyledHeroContainer>
				<div>
					<Hgroup>
						<StyledHeroTitle>
							Эксклюзивные 3D-модели и&nbsp;печать на&nbsp;3D-принтере
						</StyledHeroTitle>
						<SubTitle>
							Ваше воображение&nbsp;&mdash; наша печать!
						</SubTitle>
					</Hgroup>
					<Button
						as="button"
						type="button"
						onClick={() => onOpen && onOpen()}
					>
						Заказать печать
					</Button>
				</div>
			</StyledHeroContainer>
		</StyledHero>
	)
}

export default Hero;
