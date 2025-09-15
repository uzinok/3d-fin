import styled from "styled-components";
import Container from "../container/container";
import closeSvg from '../../../assets/icons/close.svg';

export const StyledOverlay = styled.div`
	position: fixed;
	z-index: 2;
	display: grid;
	overflow: auto;
	align-items: center;
	backdrop-filter: blur(20px);
	inset: 0;
	padding: 10px;
	animation: fadeIn 0.3s;
	background-image: linear-gradient(135deg, rgba(62, 31, 5, 0.3), rgba(106, 78, 38, 0.3), rgba(194, 156, 99, 0.3), rgba(212, 180, 131, 0.3));
	`

	export const StyledPopup = styled(Container)`
	position: relative;
	width: 100%;
	max-width: 600px;
	height: fit-content;
	padding: 30px 20px 40px;
	box-sizing: border-box;
	color: #3e1f05;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(20px);
		border-radius: 6px;
		z-index: -1;
	}
`

export const StyledPopupClose = styled.button`
appearance: none;
	border: 0;
	padding: 0;
	background-color: transparent;
	position: absolute;
	top: -10px;
	right: -10px;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	overflow: hidden;
	backdrop-filter: blur(20px);
	transition: opacity 0.25s ease-in-out;

	&:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	&:active {
		opacity: 0.6;
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		mask-image: url(${closeSvg});
		mask-size: contain;
		mask-position: center;
		mask-repeat: no-repeat;
		background-image: linear-gradient(135deg, #3e1f05, #6a4e26, #c29c63, #d4b383);
	}
`
