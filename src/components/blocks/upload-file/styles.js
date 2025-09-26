import styled from "styled-components";

export const StyledForm = styled.form `
	position: relative;
	display: flex;
	gap: 20px;
	align-items: flex-end;
	flex-wrap: wrap;
	background-color: #d4b383;
	padding: 10px;
	border-radius: 6px;
	margin-bottom: 1em;

	& > div {
		display: flex;
		gap: 20px;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	& > * {
		max-width: 350px;
	}
`

export const StyledInputFileWrap = styled.label `
	background-color: #ffffff;
	display: block;
	width: 170px;
	height: 170px;
	position: relative;
	padding: 5px;
	border: 5px solid #ffffff;
	outline: 1px solid #d4b383;
	outline-offset: -4px;

	& input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		outline: 0;

		&::file-selector-button {
			display: none;
		}

		::-webkit-file-upload-button {
			display: block;
			width: 0;
			height: 0;
			margin-left: -100%;
		}

		::-ms-browse {
			display: none;
		}
	}

	& > video,
	& img {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}
`
