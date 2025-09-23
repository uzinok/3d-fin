import { StyledHero, StyledHeroContainer, StyledHeroTitle } from "./styles";
import SubTitle from "../../ui/subtitle/subtitle";
import Button from "../../ui/button/button";
import Hgroup from "../../layout/hgroup/hgroup";

function Hero({ onOpen, hero }) {
	return (
		<StyledHero>
			<StyledHeroContainer>
				<div>
					<Hgroup>
						{hero && (
							<>
								<StyledHeroTitle>
									{hero.title}
								</StyledHeroTitle>
								<SubTitle>
									{hero.subtitle}
								</SubTitle>
							</>
						)}
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
