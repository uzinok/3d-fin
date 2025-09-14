import { StyledForm, StyledTitle, StyledButton } from "./styles";
import { InputField } from "../../ui/form-elements/input-field/input-field";
import Button from "../../ui/button/button";

function FormOrder() {
	return (
		<StyledForm>
			<StyledTitle as="h2">Заказать звонок</StyledTitle>
			<InputField />
			<InputField />
			<InputField as="textarea"/>
			<Button as="button" type="submit">Отправить</Button>
		</StyledForm>
	);
}

export default FormOrder;
