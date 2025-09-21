import { InputField } from "../../ui/form-elements/input-field/input-field";
import { StyledForm, StyledInputFileWrap } from "./styles";
import Button from "../../ui/button/button";
import { useState } from "react";

function UploadFile() {
	const [mediaType, setMediaType] = useState('');
	const [newFile, setNewFile] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setMediaType(file.type === "video/mp4" ? "video" : "image");

			const reader = new FileReader();

			reader.onloadend = () => {
				setNewFile(reader.result);
			};

			reader.readAsDataURL(file);
		}
	}

	const clearFile = () => {
		setNewFile(null);
		setMediaType('');
	}

	return (
		<StyledForm>
			{mediaType && (
				<input type="hidden" name="type" value={ mediaType } />
			)}
			<StyledInputFileWrap>
				{mediaType === "video" && (
					<video src={ newFile } controls />
				)}
				{mediaType === "image" && (
					<img src={ newFile } alt="Изображение" />
				)}
				<InputField
					type="file"
					accept="image/png, image/jpeg, video/mp4"
					onChange={ handleFileChange }
					/>
			</StyledInputFileWrap>
			<div>
				<InputField
					placeholder="Описание"
					type="text"
				/>
				<Button
					type="button"
				>Загрузить</Button>
				<Button
					onClick={ clearFile }
					type="reset"
				>Очистить</Button>
			</div>
		</StyledForm>
	)
}

export default UploadFile;
