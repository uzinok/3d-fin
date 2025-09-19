import styled from "styled-components";
import logoCircle from "../../../assets/logo/logo-circle.svg";
import Logo from "../../../assets/logo/logo.svg";

const Decor = styled.div`
	--transition-duration: 200s;
	width: 60px;
	height: 60px;
	mask-image: url(${(props) => (props.$circle ? logoCircle : Logo )});
	mask-repeat: no-repeat;
	mask-size: contain;
	${(props) => (props.$animate && "animation: rotate var(--transition-duration) linear infinite;") }
	z-index: 1;
	pointer-events: none;

	&::before {
		content: '';
		display: block;
		top: -200%;
		width: 100%;
		height: 100%;
		right: 0;
		background-image: linear-gradient(135deg, #3e1f05, #6a4e26, #c29c63, #d4b383);
		${(props) => (props.$animate && "animation: rotate var(--transition-duration) linear infinite reverse;") }
		pointer-events: none;
	}
`

export default Decor;
