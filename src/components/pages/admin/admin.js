import Header from "../../layout/header/header";
import { StyledMain, StyledContainer, StyledLink, StyledContent } from "./styles";
import Title from "../../ui/title/title";
import SubTitle from "../../ui/subtitle/subtitle";
import UploadFile from "../../blocks/upload-file/upload-file";
import Container from "../../layout/container/container";
import fetchGalleryData from "../../function/fetchGalleryData";
import GalleryDeleteMedia from "../../blocks/gallery-delete-media/gallery-delete-media";
import { useEffect, useState } from "react";

function Admin() {
	const [gallery, setGallery] = useState({});
		const [error, setError] = useState(null);
		const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadGallery = async () => {
			try {
				const result = await fetchGalleryData();

				if (result.error) {
					setError(result.error);
				} else {
					setGallery(result.data);
				}
			} catch (err) {
				setError('Ошибка при загрузке данных');
			} finally {
				setLoading(false);
			}
		};

		loadGallery();
	}, []);

	return (
		<>
			<Header>
				<StyledLink to="/">Главная</StyledLink>
				<button>Выход</button>
			</Header>
			<StyledMain>
				<StyledContainer>
					<Title>
						Добро пожаловать в панель администратора!
					</Title>
				</StyledContainer>
				<StyledContent>
					<Container>
						<Title as="h2">Сувениры и подарки</Title>
						<SubTitle>Персонализированные подарки запоминаются надолго. Мы создаем уникальные вещи, которые идеально отражают характер, увлечения или бренд. Отличный способ выделиться и порадовать близких, коллег или клиентов.</SubTitle>
						<UploadFile />
						{Object.keys(gallery).length && (
							<GalleryDeleteMedia
								loading={loading}
								error={error}
								gallery={gallery['other']}
							/>
						)}
					</Container>
					{/* <Container>
					</Container> */}
				</StyledContent>
			</StyledMain>
		</>
	);
}

export default Admin;
