import Index from "../../layout/index";
import { StyledContainer } from "./styles";
import HeroEdit from "../../blocks/hero-edit/hero-edit";

function Admin() {

	return (
		<Index>
			<StyledContainer>
				<HeroEdit />
			</StyledContainer>
		</Index>
	);
}

export default Admin;
