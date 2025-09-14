import { StyledPopupContent, StyledPopupClose } from "./styles";
import VisuallyHidden from "../../ui/visually-hidden/visually-hidden";
import { useRef, useEffect } from "react";

function Popup({ children, isOpen, onCloseDialog }) {

	const dialogRef = useRef(null);

	useEffect(() => {
		isOpen ? (
			dialogRef.current.showModal()
		) : (
			dialogRef.current.close()
		)
	}, [isOpen])

	return (
		<dialog
			ref={dialogRef}
		>
			<StyledPopupContent>
				<StyledPopupClose onClick={onCloseDialog}>
					<VisuallyHidden as='span'>Закрыть</VisuallyHidden>
				</StyledPopupClose>
				{children}
			</StyledPopupContent>
		</dialog>
	)
}

export default Popup;
