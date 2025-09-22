import Header from "../../layout/header/header";
import { StyledLink } from "./styles";
import Container from "../../layout/container/container";
import fetchGalleryData from "../../function/fetchGalleryData";
import { useEffect, useState } from "react";
import { StyledHero, StyledHeroContainer } from "../../blocks/hero/styles";
import EditHgroup from "../../blocks/edit-hgroup/edit-hgroup";
import Main from "../../layout/main/main";
import EditGallery from "../../blocks/edit-gallery/edit-gallery";

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
			<Main>
				<StyledHero>
					<StyledHeroContainer>
						<EditHgroup
							heading="Эксклюзивные 3D-модели и&nbsp;печать на&nbsp;3D-принтере"
							subheading="Ваше воображение&nbsp;&mdash; наша печать!"
						/>
					</StyledHeroContainer>
				</StyledHero>
				<section>
					<Container>
						{Object.keys(gallery).length && (
							<EditGallery
								heading="Сувениры и подарки"
								subheading="Персонализированные подарки запоминаются надолго. Мы создаем уникальные вещи, которые идеально отражают характер, увлечения или бренд. Отличный способ выделиться и порадовать близких, коллег или клиентов."
								loading={loading}
								error={error}
								gallery={gallery['other']}
							/>
						)}
					</Container>
				</section>
			</Main>
		</>
	);
}

export default Admin;
