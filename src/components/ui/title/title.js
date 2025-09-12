import { StyledTitle } from "./styles";

function Title({ children, className, ...props }) {
	return (
		<StyledTitle className={className} {...props}>
			{children}
		</StyledTitle>
	);
}

export default Title;
