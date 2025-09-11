import { StyledIcon } from "./styles";
import telegramSvg from "../../../assets/ui-icons/telegram.svg";
import youtubeSvg from "../../../assets/ui-icons/youtube.svg";

export const icons = {
	TELEGRAM: telegramSvg,
	YOUTUBE: youtubeSvg,
};

function LinkIcon({
	$icon,
	children,
	title,
	href,
	target,
	rel,
}) {
	return (
		<StyledIcon $icon={$icon} title={title} href={href} target={target} rel={rel}>
			{children}
		</StyledIcon>
	)
}

export default LinkIcon;
