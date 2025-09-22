import Header from "../../layout/header/header";
import { StyledLink } from "./styles";
import fetchGalleryData from "../../function/fetch-data";
import { useEffect, useState } from "react";
import { StyledHero, StyledHeroContainer } from "../../blocks/hero/styles";
import EditHgroup from "../../blocks/edit-hgroup/edit-hgroup";
import Main from "../../layout/main/main";
import EditGallery from "../../blocks/edit-gallery/edit-gallery";
import EditBlockList from "../../blocks/edit-block-list/edit-block-list";
import { advantages } from "../../../mocks/advantages";
import { socialList } from "../../../mocks/social-list";

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
				{Object.keys(gallery).length && (
					<EditGallery
						heading="Сувениры и подарки"
						subheading="Персонализированные подарки запоминаются надолго. Мы создаем уникальные вещи, которые идеально отражают характер, увлечения или бренд. Отличный способ выделиться и порадовать близких, коллег или клиентов."
						loading={loading}
						error={error}
						gallery={gallery['other']}
					/>
				)}
				<EditBlockList data={advantages} />
				{Object.keys(gallery).length && (
					<EditGallery
						heading="Полезные вещи для дома"
						subheading="3D-печать — это не только игрушки, но и практичность. Мы поможем напечатать недостающую деталь для бытовой техники, уникальный органайзер, подставку или любой другой аксессуар, который сделает вашу жизнь удобнее и организованнее."
						loading={loading}
						error={error}
						gallery={gallery['useful']}
					/>
				)}
				<EditBlockList data={socialList} />
				{Object.keys(gallery).length && (
					<EditGallery
						heading="3d модели"
						subheading="Для инженеров, дизайнеров и изобретателей. Мы беремся за создание сложных прототипов, функциональных деталей и архитектурных макетов. Используем профессиональные материалы для задач, где важна точность, прочность и детализация."
						loading={loading}
						error={error}
						gallery={gallery['model']}
					/>
				)}
			</Main>
		</>
	);
}

export default Admin;
