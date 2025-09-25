import Container from "../../layout/container/container";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef, useState } from "react";
import { StyledList, StyledForm } from "./styles";
import EditHgroup from "../edit-hgroup/edit-hgroup";
import { REGEXTEXT, CLASSNAME, TEXTFORBUTTON } from "../../../costants/const";
import validText from "../../function/valid-text";
import getTopLeftCoordinates from "../../function/getTopLeftCoordinates";
import ErrorMessage from "../../ui/error-message/error-message";
import SubmitMessage, { colorMessage } from "../../ui/submit-message/submit-message";
import Button from "../../ui/button/button";

function EditCard({ data, block }) {
	const blockRef = useRef(null);
	const idRef = useRef(null);
	const iconRef = useRef(null);
	const cardTitleRef = useRef(null);
	const cardDescriptionRef = useRef(null);
	const cardHrefRef = useRef(null);
	const cardLinkTextRef = useRef(null);
	const [textErrorMessage, setTextErrorMessage] = useState('');
	const [messageText, setMessageText] = useState('');
	const [messageColor, setMessageColor] = useState(colorMessage.SUCCESS);
	const [coordinates, setCoordinates] = useState({});
	const [textButton, setTextButton] = useState(TEXTFORBUTTON.send);
	const [isLoading, setIsLoading] = useState(false);

	console.log(data);


	const setValidInput = (elem) => {
		elem.classList.remove(CLASSNAME);
		if (textErrorMessage) {
			setTextErrorMessage('')
		}
	}

	const handleValidInput = (elem) => {

		if (validText(elem.value, 0, 1000, REGEXTEXT)) {
			setValidInput(elem);
		}
	}

	const setInvalidInput = (elem) => {
		elem.focus();
		elem.classList.add(CLASSNAME);
	}

	const handleSave = (e) => {
		e.preventDefault();

		if (!blockRef.current.value) {
			setMessageText('не удалось определить блок');
			setMessageColor(colorMessage.ERROR);
			return;
		}

		if (!idRef.current.value) {
			setMessageText('не удалось определить id');
			setMessageColor(colorMessage.ERROR);
			return;
}

		if (!validText(iconRef.current.value, 0, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(iconRef.current));
			setTextErrorMessage('Найдены недопустимые символы');
			setInvalidInput(iconRef.current);
			return;
		}

		if (!validText(cardTitleRef.current.value, 0, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(cardTitleRef.current));
			setTextErrorMessage('Найдены недопустимые символы');
			setInvalidInput(cardTitleRef.current);
			return;
		}

		if (!validText(cardDescriptionRef.current.value, 0, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(cardDescriptionRef.current));
			setTextErrorMessage('Найдены недопустимые символы');
			setInvalidInput(cardDescriptionRef.current);
			return;
		}

		if (!validText(cardHrefRef.current.value, 0, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(cardHrefRef.current));
			setTextErrorMessage('Найдены недопустимые символы');
			setInvalidInput(cardHrefRef.current);
			return;
		}

		if (!validText(cardLinkTextRef.current.value, 0, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(cardLinkTextRef.current));
			setTextErrorMessage('Найдены недопустимые символы');
			setInvalidInput(cardLinkTextRef.current);
			return;
		}

		const formData = new FormData(e.target);
		setIsLoading(true);
		setTextButton(TEXTFORBUTTON.loading);

		fetch('/api/edit-block-list.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: new URLSearchParams(formData)
		}).then(async (response) => {
			const data = await response.json();

			if (response.ok && data.success) {
				setMessageText(data.message);
				setMessageColor(colorMessage.SUCCESS);
				setTextButton(TEXTFORBUTTON.success);
				localStorage.removeItem('formOrderData');
			} else {
				setMessageText(data.message + (data.error ? `: ${data.error}` : ''));
				setMessageColor(colorMessage.ERROR);
				setTextButton(TEXTFORBUTTON.error);
			}
		})
			.catch((error) => {
				// Ошибка сети или парсинга JSON
				let errorMessage = 'Ошибка при отправке формы. Попробуйте повторить позже.';

				if (error instanceof SyntaxError) {
					errorMessage = 'Ошибка обработки ответа сервера';
				} else {
					errorMessage = error.message || errorMessage;
				}

				setMessageText(errorMessage);
				setMessageColor(colorMessage.ERROR);
				setTextButton(TEXTFORBUTTON.error);
			})
			.finally(() => {
				setIsLoading(false);
			});

	}

	return (
		<li>
			<StyledForm
				accept-charset="UTF-8"
				onSubmit={handleSave}
			>
				<input
					ref={blockRef}
					type="hidden"
					name="block"
					value={block}
				/>
				<input
					ref={idRef}
					type="hidden"
					name="id"
					value={data.id}
				/>
				<p> icon: {data.icon}
					<TextAreaForEdit
						ref={iconRef}
						defaultValue={data.icon}
						noMinHeight="true"
						onInput={() => handleValidInput(iconRef.current)}
						name="icon"
						/>
				</p>
				<p>title:
					<TextAreaForEdit
						ref={cardTitleRef}
						defaultValue={data.title}
						noMinHeight="true"
						onInput={() => handleValidInput(cardTitleRef.current)}
						name="title"
						/>
				</p>
				<p>description:
					<TextAreaForEdit
						ref={cardDescriptionRef}
						defaultValue={data.description}
						noMinHeight="true"
						onInput={() => handleValidInput(cardDescriptionRef.current)}
						name="description"
						/>
				</p>
				<p>href:
					<TextAreaForEdit
						ref={cardHrefRef}
						defaultValue={data.href}
						noMinHeight="true"
						onInput={() => handleValidInput(cardHrefRef.current)}
						name="href"
						/>
				</p>
				<p>linkText:
					<TextAreaForEdit
						ref={cardLinkTextRef}
						defaultValue={data.linkText}
						noMinHeight="true"
						onInput={() => handleValidInput(cardLinkTextRef.current)}
						name="linkText"
					/>
				</p>
				<Button
					type="submit"
					disabled={isLoading}
				>
					{textButton}
				</Button>
				{messageText && (
					<SubmitMessage
						color={messageColor}
					>
						{messageText}
					</SubmitMessage>
				)}
				{textErrorMessage && (
					<ErrorMessage
						$coordinates={coordinates}
					>
						{textErrorMessage}
					</ErrorMessage>
				)}
			</StyledForm>
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
