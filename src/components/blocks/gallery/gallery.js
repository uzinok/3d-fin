import Title from "../../ui/title/title";
import { StyledContainer, StyledDecor, StyledDescription } from "./styles";
import GalleryElement from "../../layout/gallery-element/gallery-element";

function Gallery({ title, loading, error, gallery, description }) {
	return (
		<section>
			<StyledContainer>
				<StyledDecor $animate="true" $circle="true" />
					{title && (
					<Title as='h2'>{title}</Title>
					)}
					{description && (
						<StyledDescription>{description}</StyledDescription>
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
