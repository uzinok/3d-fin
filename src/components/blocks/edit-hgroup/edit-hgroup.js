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
import SubmitMessage, { colorMessage } from "../../ui/submit-message/submit-message";
import { REGEXTEXT, CLASSNAME, TEXTFORBUTTON } from "../../../costants/const";

function EditHgroup({ data, block }) {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);
	const [coordinates, setCoordinates] = useState({});
	const [textErrorMessage, setTextErrorMessage] = useState('');
	const [messageColor, setMessageColor] = useState(colorMessage.SUCCESS);
	const [messageText, setMessageText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [textButton, setTextButton] = useState(TEXTFORBUTTON.send);

	useEffect(() => {
		if (!textErrorMessage && !messageText) {
			return;
		}
		const handleClickOutside = () => {
			setTextErrorMessage('');
			setMessageText('');
		}

		if (textErrorMessage || messageText) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => { document.removeEventListener('click', handleClickOutside); }
	}, [textErrorMessage, messageText]);

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

		const formData = new FormData(e.target);
		setIsLoading(true);
		setTextButton(TEXTFORBUTTON.loading);
		fetch('api/update-hgroup.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(formData)
		})
			.then(async (response) => {
				const data = await response.json();
				if (response.ok && data.success) {
					setMessageColor(colorMessage.SUCCESS);
					setMessageText(data.message);
					setTextButton(TEXTFORBUTTON.success);
				} else {
					setMessageColor(colorMessage.ERROR);
					setMessageText(data.message);
					setTextButton(TEXTFORBUTTON.error);
				}
			})
			.catch((error) => {
				let errorMessage = 'Ошибка при отправке формы. Попробуйте повторить позже.';

				if (error instanceof SyntaxError) {
					errorMessage = 'Ошибка обработки ответа сервера';
				} else {
					errorMessage = error.message || errorMessage;
				}

				setMessageText(errorMessage);
				setMessageColor(colorMessage.ERROR);
				setTextButton(TEXTFORBUTTON.error)
			})
			.finally(() => {
				setIsLoading(false);
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
			<Button
				disabled={isLoading}
				type="submit"
			>
				{textButton}
			</Button>
			{textErrorMessage && (
				<ErrorMessage $coordinates={coordinates}>
					{textErrorMessage}
				</ErrorMessage>
			)}
			{messageText && (
				<SubmitMessage color={messageColor}>
					{messageText}
				</SubmitMessage>
			)}
		</StyledForm>
	)
}

export default EditHgroup;
