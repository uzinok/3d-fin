import Title from "../../ui/title/title";
import { StyledContainer, StyledDecor } from "./styles";
import GalleryElement from "../../layout/gallery-element/gallery-element";
import SubTitle from "../../ui/subtitle/subtitle";

function Gallery({ title, loading, error, gallery, description }) {
	return (
		<section>
			<StyledContainer>
				<StyledDecor $animate="true" $circle="true" />
					{title && (
					<Title as='h2'>{title}</Title>
					)}
					{description && (
						<SubTitle>{description}</SubTitle>
					)}
					{loading && (
						<p>Загрузка...</p>
					)}
					{error && (
						<p>{error}</p>
					)}
					{gallery && (
						gallery.length > 0 && (
							<GalleryElement gallery={gallery} />
						)
				)}
			</StyledContainer>
		</section>
	)
}

export default Gallery;
