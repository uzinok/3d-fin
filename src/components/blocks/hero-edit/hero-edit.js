import { StyledRow, StyledLabel, StyledTextArea } from "./styles";
import Button from "../../ui/button/button";

function HeroEdit() {
	return (
		<>
			<StyledLabel htmlFor="edit-title">Редактировать подзаголовок</StyledLabel>
			<StyledRow>
				<StyledTextArea
					value="Эксклюзивные 3D-модели и печать на 3D-принтере"
					id="edit-title"
				/>
				<Button as="button">Обновить</Button>
			</StyledRow>
		</>
	)
}

export default HeroEdit;
