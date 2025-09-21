import styled from "styled-components";

export const StyledHgroup = styled.hgroup`
	margin-bottom: 3em;

	& h1:has( + p),
	& h2:has( + p) {
		margin-bottom: 0.15em;
	}

	& p {
		margin: 0;
	}
`
