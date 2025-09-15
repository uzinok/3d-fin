import Index from "../../layout/index";
import Hero from "../../blocks/hero/hero";
import Gallery from "../../blocks/gallery/gallery";
import Popup from "../../layout/popup/popup";
import FormOrder from "../../blocks/form-order/form-order";
import { useState } from "react";

function Home() {

	const [isShowPopup, setIsShowPopup] = useState(false);

	return (
		<>
			<Index>
				<Hero onOpen={ () => setIsShowPopup(true) } />
				<Gallery />
			</Index>
			<Popup onClose={ () => setIsShowPopup(false)} isShowPopup={ isShowPopup }>
				<FormOrder />
			</Popup>
		</>
	);
}

export default Home;
