import Title from "../../ui/title/title";
import { StyledContainer, StyledDecor } from "./styles";
import GalleryElement from "../../layout/gallery-element/gallery-element";
import SubTitle from "../../ui/subtitle/subtitle";
import { useState, useEffect } from "react";
import Hgroup from "../../layout/hgroup/hgroup";

function Gallery({ title, loading, error, gallery, description }) {
	const [isShowDecor, setIsShowDecor] = useState(false);
	useEffect(() => {
		const checkSize = () => {
			if (window.innerWidth > 768) {
				setIsShowDecor(true);
			} else {
				setIsShowDecor(false);
			}
		}

		checkSize();
		window.addEventListener('resize', checkSize);
		return () => window.removeEventListener('resize', checkSize);
	})
	return (
		<section>
			<StyledContainer>
				{isShowDecor && (
					<StyledDecor $animate="true" $circle="true" />
				)}
				<Hgroup>
					{title && (
					<Title as='h2'>{title}</Title>
					)}
					{description && (
						<SubTitle>{description}</SubTitle>
					)}
				</Hgroup>
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
