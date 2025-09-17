import { StyledHero, StyledHeroContainer, StyledHeroTitle, StyledHeroSubTitle } from "./styles";
import Button from "../../ui/button/button";

function Hero({ onOpen }) {
	return (
		<StyledHero>
			<StyledHeroContainer>
				<div>
					<StyledHeroTitle>
						Эксклюзивные 3D-модели и&nbsp;печать на&nbsp;3D-принтере
					</StyledHeroTitle>
					<StyledHeroSubTitle>
						Делаем 3D-модели и&nbsp;печать на&nbsp;3D-принтере
					</StyledHeroSubTitle>
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
