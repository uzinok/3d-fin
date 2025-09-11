import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html,
body {
	height: 100%;
}

html {
	scrollbar-gutter: stable;
}

body {
	min-width: 320px;
	margin: 0;
	line-height: 1.3;
	font-family: "Roboto", Arial, Helvetica, sans-serif;
	color: #ffffff;
	background-color: #1f1f1f;
	text-size-adjust: 100%;
}

video,
img {
	max-width: 100%;
	height: auto;
	object-fit: contain;
}

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes fadeIn {
  0% {
		opacity: 0;
		visibility: hidden;
	}
  100% {
		opacity: 1;
		visibility: visible;
	}
}
`
