import { StyledForm, StyledTitle } from "./styles";
import { InputField } from "../../ui/form-elements/input-field/input-field";
import TextArea from "../../ui/form-elements/textarea/textarea";
import Button from "../../ui/button/button";

function FormOrder() {
	return (
		<StyledForm autoComplete="off">
			<StyledTitle as="h2">Заказать звонок</StyledTitle>
			<InputField
				name="name"
				type="text"
				placeholder="Ваше имя *"
				autoComplete="off"
			/>
			<InputField
				name="contact"
				type="text"
				placeholder="Телефон/Email *"
				autoComplete="off"
			/>
			<TextArea
				as="textarea"
				name="comments"
				placeholder="Опишите желаемую модель *"
			/>
			<Button as="button" type="submit">Отправить</Button>
		</StyledForm>
	);
}

export default FormOrder;
