import styled from "styled-components";
import Decor from "../decor/decor";
import play from "../../../assets/icons/play.svg";
import pause from "../../../assets/icons/pause.svg";

export const StyledVideoWrap = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`
export const StyledButton = styled.span.attrs({
	role: "button",
})`
	position: absolute;
	inset: 0;
	appearance: none;
	border: none;
	background-color: transparent;
	padding: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	${(props) => (props.$icon === "play" ? (
	`
	transition: backdrop-filter 0.25s ease-in-out;
	backdrop-filter: blur(1px);

	&:hover {
		backdrop-filter: blur(0);
		}
		`
	) : (
		`
		opacity: 0;
		transition: opacity 0.25s ease-in-out;

		&:hover {
			opacity: 1;
			animation: fadeOut 3s ease-in-out forwards;
		}
		`
	))}

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		${(props) => (props.$icon === "play" && `
			left: 51%;
		`)}
		transform: translate(-50%, -50%);
		width: 20%;
		height: 20%;
		mask-image: url(${(props) => (props.$icon === "play" ? play : pause)});
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
		background-image: linear-gradient(135deg, #3e1f05, #6a4e26, #c29c63, #d4b383);
	}
`

export const StyledDecorButton = styled(Decor)`
	width: 50%;
	height: 50%;
`

export const StyledButtonPaused = styled.button``
