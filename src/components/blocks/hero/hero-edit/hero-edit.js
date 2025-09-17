import { StyledHero, StyledHeroContainer, StyledHeroTitle, StyledHeroSubTitle } from "../styles";
import { StyledTitleTextArea, StyledSubTitleTextArea } from "./styles";
import Button from "../../../ui/button/button";
import { useRef } from "react";

function HeroEdit() {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);
	return (
		<StyledHero>
			<StyledHeroContainer>
				<div>
					<StyledHeroTitle>
						<StyledTitleTextArea
							defaultValue="Эксклюзивные 3D-модели и&nbsp;печать на&nbsp;3D-принтере"
							ref={titleRef}
							$noMinHeight={true}
						>
						</StyledTitleTextArea>
					</StyledHeroTitle>
					<StyledHeroSubTitle>
						<StyledSubTitleTextArea
							defaultValue="Делаем 3D-модели и&nbsp;печать на&nbsp;3D-принтере"
							ref={subTitleRef}
							$noMinHeight={true}
						>
						</StyledSubTitleTextArea>
					</StyledHeroSubTitle>
					<Button as="button" type="button">Обновить</Button>
				</div>
			</StyledHeroContainer>
		</StyledHero>
	)
}

export default HeroEdit;
