import Index from "../../layout/index";
import Hero from "../../blocks/hero/hero";
import Gallery from "../../blocks/gallery/gallery";
// import Popup from "../../layout/popup/popup";
// import FormOrder from "../../blocks/form-order/form-order";

function Home() {
	return (
		<>
			<Index>
				<Hero>
					Эксклюзивные 3D-модели и&nbsp;печать на&nbsp;3D-принтере
				</Hero>
				<Gallery />
				{/* <Popup>
					<FormOrder />
				</Popup> */}
			</Index>
		</>
	);
}

export default Home;
