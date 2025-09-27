import { InputField } from "../../ui/form-elements/input-field/input-field";
import { StyledForm, StyledInputFileWrap } from "./styles";
import Button from "../../ui/button/button";
import { useState, useRef, useEffect } from "react";
import SubmitMessage, { colorMessage } from "../../ui/submit-message/submit-message";
import { REGEXTEXT, CLASSNAME, TEXTFORBUTTON } from "../../../costants/const";
import validText from "../../function/valid-text";
import getTopLeftCoordinates from "../../function/getTopLeftCoordinates";
import ErrorMessage from "../../ui/error-message/error-message";
import ReloadAnchor, {reloadAnchor} from "../../ui/reload-anchor/reload-anchor";

function UploadFile({ block }) {
	const titleRef = useRef(null);
	const fileRef = useRef(null);
	const posterRef = useRef(null);
	const [mediaType, setMediaType] = useState('');
	const [newFile, setNewFile] = useState(null);
	const [messageText, setMessageText] = useState('');
	const [messageColor, setMessageColor] = useState(colorMessage.SUCCESS);
	const [textErrorMessage, setTextErrorMessage] = useState('');
	const [coordinates, setCoordinates] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(TEXTFORBUTTON.send);
	const [poster, setPoster] = useState(null);

	const scrollId = block + '-upload-file';

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

	useEffect(() => {
		window.setTimeout(() => {
			setButtonText(TEXTFORBUTTON.send)
		}, 30000);
	}, [buttonText]);

	const setInvalidInput = (elem) => {
		elem.focus();
		elem.classList.add(CLASSNAME);
	}

	const setValidInput = (elem) => {
		elem.classList.remove(CLASSNAME);
		if (textErrorMessage) {
			setTextErrorMessage('')
		}
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Проверка размера файла (например, 10MB)
		const maxSize = 10 * 1024 * 1024;
		if (file.size > maxSize) {
			setMessageText('Файл слишком большой. Максимальный размер: 10MB');
			setMessageColor(colorMessage.ERROR);
			e.target.value = ''; // очистить input
			return;
		}

		// Проверка MIME типа
		const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
		if (!allowedTypes.includes(file.type)) {
			setMessageText('Недопустимый тип файла');
			setMessageColor(colorMessage.ERROR);
			e.target.value = '';
			return;
		}

		setMediaType(file.type === "video/mp4" ? "video" : "image");

		const reader = new FileReader();

		reader.onloadend = () => {
			setNewFile(reader.result);
		};

		reader.readAsDataURL(file);
	}

	const handlePosterChange = (e) => {

		const file = e.target.files[0];
		if (!file) return;

		// Проверка размера файла (например, 10MB)
		const maxSize = 10 * 1024 * 1024;
		if (file.size > maxSize) {
			setMessageText('Файл слишком большой. Максимальный размер: 10MB');
			setMessageColor(colorMessage.ERROR);
			e.target.value = ''; // очистить input
			return;
		}

		// Проверка MIME типа
		const allowedTypes = ['image/jpeg', 'image/png'];
		if (!allowedTypes.includes(file.type)) {
			setMessageText('Недопустимый тип файла');
			setMessageColor(colorMessage.ERROR);
			e.target.value = '';
			return;
		}

		const reader = new FileReader();

		reader.onloadend = () => {
			setPoster(reader.result);
		};

		reader.readAsDataURL(file);
	}

	const handleInputTitle = () => {
		if (validText(titleRef.current.value, 5, 50, REGEXTEXT)) {
			setValidInput(titleRef.current);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!block) {
			setMessageText('Не получен нужный блок');
			setMessageColor(colorMessage.ERROR);
			return;
		}

		if (!mediaType){
			setMessageText('Не получен тип файла');
			setMessageColor(colorMessage.ERROR);
			return;
		}

		if (!validText(titleRef.current.value, 5, 50, REGEXTEXT)) {
			setCoordinates(getTopLeftCoordinates(titleRef.current));
			setTextErrorMessage('Некорректное описание');
			setInvalidInput(titleRef.current);
			return;
		}

		if (!newFile) {
			setMessageText('Не выбран файл');
			setMessageColor(colorMessage.ERROR);
			return;
		}

		const formData = new FormData(e.target);
		setButtonText(TEXTFORBUTTON.loading);
		setIsLoading(true);
		fetch('api/upload-file.php', {
			method: 'POST',
			body: formData
		}).then(async (response) => {
			const data = await response.json();

			if (response.ok && data.success) {
				setMessageText(data.message);
				setMessageColor(colorMessage.SUCCESS);
				setButtonText(TEXTFORBUTTON.success)
				reloadAnchor(scrollId);
			} else {
				setMessageText(data.message + (data.error ? `: ${data.error}` : ''));
				setMessageColor(colorMessage.ERROR);
				setButtonText(TEXTFORBUTTON.error);
			}
		}).catch((error) => {
			let errorMessage = 'Ошибка при отправке формы. Попробуйте повторить позже.';

			if (error instanceof SyntaxError) {
				errorMessage = 'Ошибка обработки ответа сервера';
			} else {
				errorMessage = error.message || errorMessage;
			}

			setMessageText(errorMessage);
			setMessageColor(colorMessage.ERROR);
			setButtonText(TEXTFORBUTTON.error);
		}).finally(() => {
			setIsLoading(false);
		})

	}

	const clearFile = () => {
		setNewFile(null);
		setMediaType('');
		if (fileRef.current) {
			fileRef.current.value = '';
		}
	}

	return (
		<StyledForm
			id={scrollId}
			onSubmit={ handleSubmit }
		>
			<ReloadAnchor />
			<input
				type="hidden"
				name="block"
				value={block}
			/>
			{mediaType && (
				<input
					type="hidden"
					name="type"
					value={mediaType}
				/>
			)}
			<StyledInputFileWrap>
				{mediaType === "video" && (
					<video src={ newFile } controls />
				)}
				{mediaType === "image" && (
					<img
						src={newFile}
						alt="Изображение"
					/>
				)}
				<InputField
					ref={fileRef}
					type="file"
					name="file"
					accept="image/png, image/jpeg, video/mp4"
					onChange={ handleFileChange }
					/>
			</StyledInputFileWrap>
			{mediaType === "video" && (
				<StyledInputFileWrap>
					<InputField
						ref={posterRef}
						type="file"
						name="poster"
						accept="image/png, image/jpeg"
						onChange={handlePosterChange}
					/>
					{poster && (
						<img
							src={poster}
							alt="Постер"
						/>
					)}
				</StyledInputFileWrap>
			)}
			<div>
				<InputField
					ref={titleRef}
					placeholder="Описание"
					name="title"
					type="text"
					onInput={ handleInputTitle }
				/>
				<Button
					type="submit"
					disabled={isLoading}
				>
					{ buttonText }
				</Button>
				<Button
					onClick={ clearFile }
					type="reset"
				>Очистить</Button>
			</div>
			{messageText && (
				<SubmitMessage
					color={messageColor}
				>{messageText}</SubmitMessage>
			)}
			{textErrorMessage && (
				<ErrorMessage
					$coordinates={coordinates}
				>{textErrorMessage}</ErrorMessage>
			)}
		</StyledForm>
	)
}

export default UploadFile;
