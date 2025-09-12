import Index from "../../layout/index";
import Hero from "../../blocks/hero/hero";
import Gallery from "../../blocks/gallery/gallery";

function Home() {
	return (
		<>
			<Index>
				<Hero>
					Эксклюзивные 3D-модели и&nbsp;печать на&nbsp;3D-принтере
				</Hero>
				<Gallery />
			</Index>
		</>
	);
}

export default Home;
