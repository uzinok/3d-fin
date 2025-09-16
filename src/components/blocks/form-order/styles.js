import styled from "styled-components";
import Title from "../../ui/title/title";

export const StyledForm = styled.form`
	display: grid;
	gap: 20px;

	& > *:last-child {
		margin-bottom: 0;
	}

	& > *:first-child {
		margin-top: 0;
	}
`

export const StyledTitle = styled(Title)`
	margin: 0;
`
