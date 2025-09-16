import Container from "../../layout/container/container";
import Title from "../../ui/title/title";
import GalleryElement from "../../layout/gallery-element/gallery-element";
import { StyledContainer, StyledDecor } from "./styles";
import { useState, useEffect } from "react";

function Gallery() {
	const [data, setData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGalleryData = async () => {
			try {
				setLoading(true);
				const response = await fetch('get-gallery.php');

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const result = await response.json();

				if (result.success) {
					setData(result.data);
				} else {
					throw new Error(result.message || 'Failed to fetch gallery data');
				}
			} catch (err) {
				setError(err.message);
				console.error('Error fetching gallery data:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchGalleryData();
	}, []);

	if (loading) {
		return (
			<section>
				<Container>
					<Title as='h2'>Мои работы</Title>
					<p>Загрузка...</p>
				</Container>
			</section>
		);
	}

	if (error) {
		return (
			<section>
				<Container>
					<Title as='h2'>Мои работы</Title>
					<p>Ошибка загрузки: {error}</p>
				</Container>
			</section>
		);
	}

	return (
		<section>
			<StyledContainer>
				<StyledDecor $animate="true" $circle="true" />
				<Title as='h2'>Мои работы</Title>
				{Object.keys(data).length > 0 && (
					<>
						<GalleryElement gallery={data['other']} />
						<GalleryElement gallery={data['useful']} />
						<GalleryElement gallery={data['model']} />
					</>
				)}
			</StyledContainer>
		</section>
	)
}

export default Gallery;
