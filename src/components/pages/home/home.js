import Index from "../../layout/index";
import Hero from "../../blocks/hero/hero";
import Gallery from "../../blocks/gallery/gallery";
import Popup from "../../layout/popup/popup";
import FormOrder from "../../blocks/form-order/form-order";
import { useState } from "react";

function Home() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	return (
		<>
			<Index>
				<Hero
					onOpenDialog={() => {
						setIsDialogOpen(true);
						console.log('open dialog');
					}}
				/>
				<Gallery />
				<Popup
					onCloseDialog={() => setIsDialogOpen(false)}
					isOpen={isDialogOpen}
				>
					<FormOrder />
				</Popup>
			</Index>
		</>
	);
}

export default Home;
