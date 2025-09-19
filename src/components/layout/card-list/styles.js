import styled from "styled-components";

export const StyledList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 30px;

	& a {
		text-decoration: none;
		color: inherit;
	}
`

export const StyledCard = styled.div`
	display: grid;
	gap: 20px;
	padding: 30px 20px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.05);
	transition: transform 0.3s ease, background 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		background: rgba(255, 255, 255, 0.1);
	}

	& h3 {
		margin: 0;
	}

	& p {
		margin: 0;
	}

	& span {
		color: #d4b383;
	}
`

export const StyledIcon = styled.span`
	font-size: 2.5em;
	color: #4f96ff;
`
