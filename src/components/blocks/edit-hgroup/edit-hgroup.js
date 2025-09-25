import Hgroup from "../../layout/hgroup/hgroup";
import Title from "../../ui/title/title";
import SubTitle from "../../ui/subtitle/subtitle";
import Button from "../../ui/button/button";
import { StyledForm } from "./styles";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef, useState, useEffect } from "react";
import validText from "../../function/valid-text";
import getTopLeftCoordinates from "../../function/getTopLeftCoordinates";
import ErrorMessage from "../../ui/error-message/error-message";

const REGEXTEXT = /^(?!.*<[^>]+>)(?!.*(function\s*\(|const\s+|let\s+|var\s+|if\s*\(|for\s*\(|while\s*\(|console\.)).*$/;
const CLASSNAME = "invalid";

function EditHgroup({ data, block }) {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);
	const [coordinates, setCoordinates] = useState({});
	const [textErrorMessage, setTextErrorMessage] = useState('');

	useEffect(() => {
		if (!textErrorMessage) {
			return;
		}
		const handleClickOutside = () => {
			setTextErrorMessage('');
		}

		if (textErrorMessage) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => { document.removeEventListener('click', handleClickOutside); }
	},[textErrorMessage]);

	const setInvalidInput = (elem) => {
		elem.focus();
		elem.classList.add(CLASSNAME);
	}

	const setValidInput = (elem) => {
		elem.classList.remove(CLASSNAME);
		if (textErrorMessage)
			setTextErrorMessage('');
	}

	const handleInputTitle = () => {
		if (validText(titleRef.current.value, 3, 1000, REGEXTEXT)) {
			setValidInput(titleRef.current);
		}
	}

	const handleInputSubTitle = () => {
		if (validText(subTitleRef.current.value, 0, 1000, REGEXTEXT)) {
			setValidInput(subTitleRef.current);
		}
	}

	const handleSave = (e) => {
		e.preventDefault();

		if (!validText(titleRef.current.value, 3, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(titleRef.current));
			setInvalidInput(titleRef.current);
			setTextErrorMessage('Должно быть не mенее 3 символов');
			return;
		}

		if (!validText(subTitleRef.current.value, 0, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(subTitleRef.current));
			setInvalidInput(subTitleRef.current);
			setTextErrorMessage('Найдены не корректные символы');
			return;
		}
		console.log('submit');

		const formData = new FormData(e.target);

		fetch('update-hgroup.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(formData)
		})
			.then(async (response) => {
				const data = await response.json();

				if (response.ok && data.success) {
					console.log(data);
				} else {
					console.log('error');
				}
			})
			.catch((error) => {
			if (error) {
				console.log('error');
			}
		});
	}

	return (
		<StyledForm
			onSubmit={handleSave}
		>
			<input type="hidden" name="block" value={block} />
			<Hgroup>
				<Title>
					<TextAreaForEdit
						ref={titleRef}
						defaultValue={data.title}
						noMinHeight="true"
						onInput={handleInputTitle}
						name="title"
						/>
				</Title>
				<SubTitle
				>
					<TextAreaForEdit
						ref={subTitleRef}
						defaultValue={data.subtitle}
						noMinHeight="true"
						onInput={handleInputSubTitle}
						name="subtitle"
					/>
				</SubTitle>
			</Hgroup>
			<Button type="submit">Изменить</Button>
			{textErrorMessage && (
				<ErrorMessage $coordinates={coordinates}>
					{textErrorMessage}
				</ErrorMessage>
			)}
		</StyledForm>
	)
}

export default EditHgroup;
