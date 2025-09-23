import Hgroup from "../../layout/hgroup/hgroup";
import Title from "../../ui/title/title";
import SubTitle from "../../ui/subtitle/subtitle";
import Button from "../../ui/button/button";
import { StyledForm } from "./styles";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef } from "react";

function EditHgroup({ heading, subheading }) {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);

	return (
		<StyledForm>
			<Hgroup>
				<Title>
					<TextAreaForEdit
						ref={titleRef}
						defaultValue={heading}
						noMinHeight="true"
						/>
				</Title>
				<SubTitle
				>
					<TextAreaForEdit
						ref={subTitleRef}
						defaultValue={subheading}
						noMinHeight="true"
					/>
				</SubTitle>
			</Hgroup>
			<Button>Изменить</Button>
		</StyledForm>
	)
}

export default EditHgroup;
