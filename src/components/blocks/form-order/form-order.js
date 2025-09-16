import { StyledForm, StyledTitle } from "./styles";
import { InputField } from "../../ui/form-elements/input-field/input-field";
import TextArea from "../../ui/form-elements/textarea/textarea";
import Button from "../../ui/button/button";
import { useRef, useState } from "react";
import getTopLeftCoordinates from "../../function/getTopLeftCoordinates";
import ErrorMessage from "../../ui/error-message/error-message";
import SubmitMessage, { colorMessage } from "../../ui/submit-message/submit-message";
import validText from "../../function/valid-text";

const REGEXTEXT = /^(?!.*<[^>]+>)(?!.*(function\s*\(|const\s+|let\s+|var\s+|if\s*\(|for\s*\(|while\s*\(|console\.)).*$/;
const PHONEREGEX = /^(\+7|8)[0-9]{10}$/;
const TELEGRAMREGEX = /^@[a-zA-Z0-9_]{5,}$/;

const CLASSNAME = "invalid";

const TEXTFORBUTTON = {
	send: 'Отправить',
	loading: 'Загрузка',
	error: 'Ошибка',
	success: 'Отправлено',
}

function FormOrder() {
	const [coordinates, setCoordinates] = useState({});
	const [textErrorMessage, setTextErrorMessage] = useState("");
	const nameRef = useRef(null);
	const contactRef = useRef(null);
	const commentsRef = useRef(null);
	const formRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [TextForButton, setTextFormButton] = useState(TEXTFORBUTTON.send)
	const [messageText, setMessageText] = useState('');
	const [messageColor, setMessageColor] = useState(colorMessage.SUCCESS);
	const [typeContact, setTypeContact] = useState('');
	const refTypeContact = useRef(null);

	const validContact = (text) => {
		text = text.replace(/[\s()\\-]/g, "");

		if (PHONEREGEX.test(text)) {
			setTypeContact('phone');
			return 'phone';
		}

		if (TELEGRAMREGEX.test(text)) {
			setTypeContact('telegram');
			return 'telegram';
		}

		setTypeContact('');
		return '';
	}

	const setInvalidInput = (elem) => {
		elem.focus();
		elem.classList.add(CLASSNAME);
	}

	const setValidInput = (elem) => {
		elem.classList.remove(CLASSNAME);
		if (textErrorMessage)
			setTextErrorMessage('');
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validText(nameRef.current.value, 3, 50, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(nameRef.current));
			setInvalidInput(nameRef.current);
			setTextErrorMessage('Должно быть не менее 3 символов');
			return;
		}
		console.log(validContact(contactRef.current.value));

		if (validContact(contactRef.current.value) === "") {
			setCoordinates(getTopLeftCoordinates(contactRef.current));
			setInvalidInput(contactRef.current);
			setTextErrorMessage('Не правильно заполнено поле');
			return;
		}

		if (!validText(commentsRef.current.value, 10, 1000, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(commentsRef.current));
			setInvalidInput(commentsRef.current);
			setTextErrorMessage('Комментарий должен быть не менее 10 и не более 1000 символов');
			return;
		}

		const formData = new FormData(formRef.current);
		setIsLoading(true);

		fetch('https://colorlesscat.uzinok.ru/submit-1.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: new URLSearchParams(formData)
		})
			.then((response) => {
				setTextFormButton(TEXTFORBUTTON.loading)
				if (response.status >= 200 && response.status < 300 && response.ok) {
					setMessageText(response.text());
					formRef.current.reset();
					setTextFormButton(TEXTFORBUTTON.success);
					setIsLoading(false);
					formRef.current.reset();
				} else {
					setMessageText(response.text());
					setMessageColor(colorMessage.ERROR);
					setTextFormButton(TEXTFORBUTTON.error);
					setIsLoading(false);
				}
			})
			.catch(() => {
				setMessageText('Ошибка при отправке формы. \n Попробуйте повторить позже.');
				setMessageColor(colorMessage.ERROR);
				setTextFormButton(TEXTFORBUTTON.error);
				setIsLoading(false);
			});
	}

	const clearMessage = () => {
		setTextErrorMessage('');
		messageText && setMessageText('');
	}

	const handleInputName = () => {
		if (validText(nameRef.current.value, 3, 50, REGEXTEXT))
			setValidInput(nameRef.current);
	}

	const haldleInputContact = () => {
		if (validContact(contactRef.current.value))
			setValidInput(contactRef.current);
	}

	const handleInputComments = () => {
		if (validText(commentsRef.current.value, 10, 1000, REGEXTEXT))
			setValidInput(commentsRef.current);
	}

	return (
		<StyledForm
			ref={formRef}
			autoComplete="off"
			onSubmit={handleSubmit}
			onClick={clearMessage}
			>
			<StyledTitle as="h2">Заказать звонок</StyledTitle>
			<input
				ref={refTypeContact}
				type="hidden"
				name="typeContact"
				value={typeContact}
			/>
			<InputField
				ref={nameRef}
				name="name"
				type="text"
				placeholder="Ваше имя *"
				autoComplete="off"
				onInput={handleInputName}
				/>
			<InputField
				ref={contactRef}
				name="contact"
				type="text"
				placeholder="Телефон/Телеграм *"
				autoComplete="off"
				onInput={haldleInputContact}
			/>
			<TextArea
				ref={commentsRef}
				as="textarea"
				name="comments"
				placeholder="Опишите желаемую модель *"
				onInput={handleInputComments}
			/>
			<Button as="button" type="submit" disabled={isLoading}>{ TextForButton }</Button>
			{textErrorMessage && (
				<ErrorMessage $coordinates={coordinates}>{textErrorMessage}</ErrorMessage>
			)}
			{messageText && (
				<SubmitMessage color={messageColor}>{messageText}</SubmitMessage>
			)}
		</StyledForm>
	);
}

export default FormOrder;
