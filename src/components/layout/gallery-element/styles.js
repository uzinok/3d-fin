import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import arrowNext from "../../../assets/icons/next.svg";
import arrowPrev from "../../../assets/icons/prew.svg";

export const StyledSwiperSlide = styled(SwiperSlide)`
	border: 1px solid #d4b383;
	padding: 5px;
	box-sizing: border-box;
	height: initial;
	background-color: #ffffff;

	& img,
	& video {
		display: block;
		object-position: center center;
		object-fit: cover;
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
	}
`

export const StyledSwiperContainer = styled.div`
	position: relative;
	margin-bottom: 20px;

	& > div {
		padding: 1px;
	}
`

export const StyledNavigationButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 2;
	width: 50px;
	height: 50px;
	padding: 0;
	appearance: none;
	border: 0;
	background: transparent;
	font-size: 24px;
	font-weight: 700;
	font-family: inherit;
	color: inherit;
	transition: opacity 0.25s ease-in-out, filter 0.25s ease-in-out;

	&:not(:disabled):hover {
		opacity: 0.7;
	}

	&:not(:disabled):active {
		opacity: 0.5;
	}

	&:disabled {
		filter: grayscale(100%);
		opacity: 0.5;
	}

	${(props) => {
		const content = props.direction === 'next' ? arrowNext : arrowPrev;
		const direction = props.direction === 'next' ? 'right' : 'left';
		return `
		&:before {
			content: '';
			position: absolute;
			inset: 0;
			mask-image: url(${content});
			mask-repeat: no-repeat;
			mask-position: center;
			mask-size: 50% auto;
			background-image: linear-gradient(135deg, #3e1f05, #6a4e26, #c29c63, #d4b383);
		}
		${direction}: -33px;
		@media (min-width: 1040px) {
			${direction}: -48px;
		}
	`}}
`
