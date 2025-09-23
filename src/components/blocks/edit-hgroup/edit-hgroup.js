import Hgroup from "../../layout/hgroup/hgroup";
import Title from "../../ui/title/title";
import SubTitle from "../../ui/subtitle/subtitle";
import Button from "../../ui/button/button";
import { StyledForm } from "./styles";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef } from "react";

function EditHgroup({ data, block }) {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);

	return (
		<StyledForm>
			<input type="hidden" name="block" value={block} />
			<Hgroup>
				<Title>
					<TextAreaForEdit
						ref={titleRef}
						defaultValue={data.title}
						noMinHeight="true"
						/>
				</Title>
				<SubTitle
				>
					<TextAreaForEdit
						ref={subTitleRef}
						defaultValue={data.subtitle}
						noMinHeight="true"
					/>
				</SubTitle>
			</Hgroup>
			<Button>Изменить</Button>
		</StyledForm>
	)
}

export default EditHgroup;
