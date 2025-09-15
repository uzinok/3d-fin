import { StyledOverlay, StyledPopup, StyledPopupClose } from "./styles";
import VisuallyHidden from "../../ui/visually-hidden/visually-hidden";
import { useEffect, useRef } from "react";

function Popup({ children, onClose, isShowPopup }) {
	const popupRef = useRef(null);

	function handlerEsc(e) {
		if (e.key === 'Escape') {
			onClose && onClose();
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handlerEsc);
		return () => {
			document.removeEventListener('keydown', handlerEsc);
		}
	});

	useEffect(() => {
		document.body.style.overflow = isShowPopup ? 'hidden' : 'auto';
		const rootChildren = document.querySelector('#root').children;

		for (const child of rootChildren) {
			child !== popupRef.current && isShowPopup ? (
				child.setAttribute('inert', 'true')
			) : (
				child.removeAttribute('inert')
			);
		}
	});

	const handleOverlayClick = (e) => {
		e.target === popupRef.current &&	onClose();
	}

	return isShowPopup && (
		<StyledOverlay
			ref={popupRef}
			onClick={handleOverlayClick}
		>
			<StyledPopup>
				<StyledPopupClose onClick={() => onClose && onClose()}>
					<VisuallyHidden as='span'>Закрыть</VisuallyHidden>
				</StyledPopupClose>
				{children}
			</StyledPopup>
		</StyledOverlay>
	);
}

export default Popup;
