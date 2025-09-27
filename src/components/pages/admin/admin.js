import Header from "../../layout/header/header";
import { StyledLink } from "./styles";
import fetchData from "../../function/fetch-data";
import { useEffect, useState } from "react";
import { StyledHero, StyledHeroContainer } from "../../blocks/hero/styles";
import EditHgroup from "../../blocks/edit-hgroup/edit-hgroup";
import Main from "../../layout/main/main";
import EditGallery from "../../blocks/edit-gallery/edit-gallery";
import EditBlockList from "../../blocks/edit-block-list/edit-block-list";
import Login from "./login";
import { isAuthenticated, logout } from "./auth";

function Admin() {
	const [data, setData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		setAuthenticated(isAuthenticated());
	}, []);

	const handleLoginSuccess = () => {
		setAuthenticated(true);
	};

	const handleLogout = () => {
		logout();
		setAuthenticated(false);
	};

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
				{authenticated && (
					<button
						onClick={handleLogout}
					>Выход</button>
				)}
			</Header>
			<Main>
				{!authenticated && (
					<Login onLoginSuccess={handleLoginSuccess} />
				)}
				{authenticated && (
					<>
						{data.hero && (
							<StyledHero>
								<StyledHeroContainer>
									<EditHgroup
										data={data.hero}
										block="hero"
									/>
								</StyledHeroContainer>
							</StyledHero>
						)}
						{data.gallery && (
							<EditGallery
								loading={loading}
								error={error}
								block="other"
								data={data.gallery.other}
							/>
						)}
						{data.advantages && (
							<EditBlockList
								data={data.advantages}
								block="advantages"
							/>
						)}
						{data.gallery && (
							<EditGallery
								loading={loading}
								error={error}
								data={data.gallery.useful}
								block="useful"
							/>
						)}
						{data.social && (
							<EditBlockList
								data={data.social}
								block="social"
							/>
						)}
						{data.gallery && (
							<EditGallery
								loading={loading}
								error={error}
								data={data.gallery.model}
								block="model"
							/>
						)}
					</>
				)}

			</Main>
		</>
	);
}

export default Admin;
