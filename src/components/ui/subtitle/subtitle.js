import { StyledSubTitle } from "./styles";

function SubTitle({ children, className, ...props }) {
	return (
		<StyledSubTitle className={className} {...props}>
			{children}
		</StyledSubTitle>
	);
}

export default SubTitle;
