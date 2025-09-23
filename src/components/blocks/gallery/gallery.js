import Title from "../../ui/title/title";
import { StyledContainer, StyledDecor } from "./styles";
import GalleryElement from "../../layout/gallery-element/gallery-element";
import SubTitle from "../../ui/subtitle/subtitle";
import { useState, useEffect } from "react";
import Hgroup from "../../layout/hgroup/hgroup";

function Gallery({ loading, error, data }) {
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
				{data && (
					<>
						{isShowDecor && (
							<StyledDecor $animate="true" $circle="true" />
						)}
						<Hgroup>
							{data.title && (
								<Title as='h2'>{data.title}</Title>
							)}
							{data.subtitle && (
								<SubTitle>{data.subtitle}</SubTitle>
							)}
						</Hgroup>
						{loading && (
							<p>Загрузка...</p>
						)}
						{error && (
							<p>{error}</p>
						)}
						{data.items.length > 0 ? (
							<GalleryElement gallery={data.items} />
						) : (
							<p>Не удалось получиь галлерею.</p>
					)}
				</>
			)}
				</StyledContainer>
		</section>
	)
}

export default Gallery;
