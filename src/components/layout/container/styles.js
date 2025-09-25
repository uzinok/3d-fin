import styled from "styled-components"

const StyledContainer = styled.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 50px 25px;

	@media (min-width: 768px) {
		padding: 100px 20px;
	}

	& > *:first-child {
		margin-top: 0;
	}

	& > *:last-child {
		margin-bottom: 0;
	}
`

export default StyledContainer;
