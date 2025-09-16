import styled from "styled-components";
import { InputField } from "../input-field/input-field";

export const StyledTextArea = styled(InputField).attrs(props => ({
	as: "textarea",
	className: props.className,
	name: props.name,
	placeholder: props.placeholder,
	ref: props.ref,
	onInput: props.onInput,
	...props
}))`
	height: calc(var(--input-height) * 2);
	overflow: hidden;
	line-height: inherit;
`
