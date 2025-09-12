import Container from "../container/container";
import styled from "styled-components";

export const StyledFooter = styled(Container).attrs(props => ({as: "footer"}))`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	padding: 20px;
`
