import styled from "styled-components";
import heroBg from "../../../assets/index/hero-bg.webp";
import Container from "../../layout/container/container";
import heroImg from "../../../assets/index/hero-img.webp";
import Title from "../../ui/title/title";

export const StyledHero = styled.section`
	position: relative;
	padding-top: 65px;
	color: #fff;
	background-color: #1f1f1fff;
	background-image: url(${heroBg});
	background-repeat: no-repeat;
	background-position: center top;
	background-size: cover;
`

export const StyledHeroContainer = styled(Container)`
	position: relative;
	padding-bottom: 40px;

	@media (max-width: 445px) {
		&::before {
			display: none;
		}
	}

	@media (min-width: 445px) {
		display: grid;
		align-items: center;
		grid-template-columns: 50% 1fr;
	}

	@media (min-width: 1000px) {
		min-height: 470px;
	}

	&::after {
		content: '';
		display: block;
		height: 130%;
		background-image: url(${heroImg});
		background-repeat: no-repeat;
		background-position: right bottom;
		background-size: contain;

		@media (max-width: 1000px) {
			background-position: center bottom;
		}

		@media (min-width: 1000px) {
			height: 100%;
		}
	}
`

export const StyledHeroTitle = styled(Title).attrs(props => ({className: props.className}))`
	letter-spacing: 2px;
	text-wrap-style: balance;

	&:has(+ p) {
		margin-bottom: 0.25em;
	}
`

export const StyledHeroSubTitle = styled.p`
	font-size: 20px;
	margin-top: 0;
	margin-bottom: 2em;
`
