import Container from "../../layout/container/container";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef, useState } from "react";
import { StyledList } from "./styles";
import EditHgroup from "../edit-hgroup/edit-hgroup";
import { REGEXTEXT, CLASSNAME, TEXTFORBUTTON } from "../../../costants/const";
import validText from "../../function/valid-text";
import getTopLeftCoordinates from "../../function/getTopLeftCoordinates";
import ErrorMessage from "../../ui/error-message/error-message";
import SubmitMessage, { colorMessage } from "../../ui/submit-message/submit-message";

function EditCard({ data, block }) {
	const iconRef = useRef(null);
	const cardTitleRef = useRef(null);
	const cardDescriptionRef = useRef(null);
	const cardHrefRef = useRef(null);
	const cardLinkTextRef = useRef(null);
	const [textErrorMessage, setTextErrorMessage] = useState('');

	const setValidInput = (elem) => {
		elem.classList.remove(CLASSNAME);
		if (textErrorMessage) {
			setTextErrorMessage('')
		}
	}

	const handleValidInput = (elem) => {
		if (validText(elem, 0, 1000, REGEXTEXT)) {
			setValidInput(elem);
		}
	}

	const handleSave = () => {}


	return (
		<li>
			<form>
				<input type="hidden" name="block" value={block} />
				<p> icon: {data.icon}
					<TextAreaForEdit
						ref={iconRef}
						defaultValue={data.icon}
						noMinHeight="true"
					/>
				</p>
				<p>title:
					<TextAreaForEdit
						ref={cardTitleRef}
						defaultValue={data.title}
						noMinHeight="true"
					/>
				</p>
				<p>description:
					<TextAreaForEdit
						ref={cardDescriptionRef}
						defaultValue={data.description}
						noMinHeight="true"
					/>
				</p>
				<p>href:
					<TextAreaForEdit
						ref={cardHrefRef}
						defaultValue={data.href}
						noMinHeight="true"
					/>
				</p>
				<p>linkText:
					<TextAreaForEdit
						ref={cardLinkTextRef}
						defaultValue={data.linkText}
						noMinHeight="true"
					/>
				</p>
			</form>
		</li>
	)
}

function EditBlockList({ data, block }) {

	return (
		<section>
			<Container>
				{data.title && (
					<EditHgroup
						data={data}
						block={block}
					/>
				)}
				{data.list && (
					<StyledList>
						{data.list.map((item, index) => (
							<EditCard
								key={index}
								data={item}
								block={block}
							/>
					))}
					</StyledList>
				)}
			</Container>
		</section>
	)
}

export default EditBlockList;
