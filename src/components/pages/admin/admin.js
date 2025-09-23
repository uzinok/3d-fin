import Header from "../../layout/header/header";
import { StyledLink } from "./styles";
import fetchData from "../../function/fetch-data";
import { useEffect, useState } from "react";
import { StyledHero, StyledHeroContainer } from "../../blocks/hero/styles";
import EditHgroup from "../../blocks/edit-hgroup/edit-hgroup";
import Main from "../../layout/main/main";
import EditGallery from "../../blocks/edit-gallery/edit-gallery";
import EditBlockList from "../../blocks/edit-block-list/edit-block-list";

function Admin() {
	const [data, setData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadAllData = async () => {
			try {
				const result = await fetchData();

				if (result.error) {
					setError(result.error);
					console.error('API Error:', result.error);
				} else {
					setData(result.data);
				}
			} catch (err) {
				console.error('Loading error:', err);
				setError('Ошибка при загрузке данных');
			} finally {
				setLoading(false);
			}
		};

		loadAllData();
	}, []);

	return (
		<>
			<Header>
				<StyledLink to="/">Главная</StyledLink>
				<button>Выход</button>
			</Header>
			<Main>
				{data.hero && (
				<StyledHero>
					<StyledHeroContainer>
						<EditHgroup
							heading={data.hero.title}
							subheading={data.hero.subtitle}
						/>
					</StyledHeroContainer>
					</StyledHero>
				)}
				{data.gallery && (
					<EditGallery
						loading={loading}
						error={error}
						data={data.gallery.other}
					/>
				)}
				{data.advantages && (
					<EditBlockList data={data.advantages} />
				)}
				{data.gallery && (
					<EditGallery
						loading={loading}
						error={error}
						data={data.gallery.useful}
					/>
				)}
				{data.socialList && (
					<EditBlockList data={data.socialList} />
				)}
				{data.gallery && (
					<EditGallery
						loading={loading}
						error={error}
						data={data.gallery.model}
					/>
				)}
			</Main>
		</>
	);
}

export default Admin;
