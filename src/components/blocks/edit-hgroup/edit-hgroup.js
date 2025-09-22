import Hgroup from "../../layout/hgroup/hgroup";
import Title from "../../ui/title/title";
import SubTitle from "../../ui/subtitle/subtitle";
import Button from "../../ui/button/button";
import { StyledContainer } from "./styles";

function EditHgroup({ heading, subheading}) {
	return (
		<StyledContainer>
			<Hgroup>
				<Title>{heading}</Title>
				<SubTitle>{subheading}</SubTitle>
			</Hgroup>
			<Button>Изменить</Button>
		</StyledContainer>
	)
}

export default EditHgroup;
