import Index from "../../layout/index";
import Hero from "../../blocks/hero/hero";
import Popup from "../../layout/popup/popup";
import FormOrder from "../../blocks/form-order/form-order";
import { useState, useEffect } from "react";
import fetchData from "../../function/fetch-data";
import Gallery from "../../blocks/gallery/gallery";
import BlockList from "../../blocks/block-list/block-list";

function Home() {
	const [isShowPopup, setIsShowPopup] = useState(false);
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
			<Index>
				<Hero onOpen={() => setIsShowPopup(true)} hero={data.hero} />

				{data.gallery && (
					<Gallery
						loading={loading}
						error={error}
						data={data.gallery.other}
					/>
				)}

				{data.advantages && (
					<BlockList
						data={data.advantages}
					/>
				)}

				{data.gallery && (
					<Gallery
						loading={loading}
						error={error}
						data={data.gallery.useful}
					/>
				)}

				{data.social && (
					<BlockList
						data={data.social}
					/>
				)}

				{data.gallery && (
					<Gallery
						loading={loading}
						error={error}
						data={data.gallery.model}
					/>
				)}
			</Index>
			<Popup onClose={ () => setIsShowPopup(false)} isShowPopup={ isShowPopup }>
				<FormOrder />
			</Popup>
		</>
	);
}

export default Home;
