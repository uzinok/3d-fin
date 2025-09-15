import Index from "../../layout/index";
import Hero from "../../blocks/hero/hero";
import Gallery from "../../blocks/gallery/gallery";
import Popup from "../../layout/popup/popup";
import FormOrder from "../../blocks/form-order/form-order";

function Home() {
	return (
		<>
			<Index>
				<Hero />
				<Gallery />
				<Popup>
					<FormOrder />
				</Popup>
			</Index>
		</>
	);
}

export default Home;
