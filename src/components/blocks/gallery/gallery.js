import Container from "../../layout/container/container";
import Title from "../../ui/title/title";
import { MySwiper } from "../../ui/swiper-gallery/swiper-gallery";
import { response } from "../../../mocks/response";
import { useState, useEffect } from "react";

function Gallery() {
	const [data, setData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGalleryData = () => {
			setLoading(true);
			if (response && response['data']) {
				setData(response['data']);
			} else {
				setError('Ошибка загрузки данных');
			}
			setLoading(false);
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
			<Container>
				<Title as='h2'>Мои работы</Title>
				{Object.keys(data).length > 0 && (
					<>
						<MySwiper gallery={data['other']} />
						<MySwiper gallery={data['useful']} />
						<MySwiper gallery={data['model']} />
					</>
				)}
			</Container>
		</section>
	)
}

export default Gallery;
