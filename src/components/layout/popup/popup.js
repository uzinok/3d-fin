import { StyledPopup, StyledPopupContent, StyledPopupClose } from "./styles";
import VisuallyHidden from "../../ui/visually-hidden/visually-hidden";

function Popup({ children }) {
	return (
		<StyledPopup>
			<StyledPopupContent>
				<StyledPopupClose>
					<VisuallyHidden as='span'>Закрыть</VisuallyHidden>
				</StyledPopupClose>
				{children}
			</StyledPopupContent>
		</StyledPopup>
	)
}

export default Popup;
