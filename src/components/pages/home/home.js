import Index from "../../layout/index";
import Hero from "../../blocks/hero/hero";
import Popup from "../../layout/popup/popup";
import FormOrder from "../../blocks/form-order/form-order";
import { useState, useEffect } from "react";
import fetchData from "../../function/fetch-data";
import Gallery from "../../blocks/gallery/gallery";
import BlockList from "../../blocks/block-list/block-list";
import { advantages } from "../../../mocks/advantages";
import { socialList } from "../../../mocks/social-list";

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
				<Hero onOpen={() => setIsShowPopup(true)} />
				<Gallery
					title="Сувениры и подарки"
					loading={loading}
					error={error}
					data={data['other']}
					description="Персонализированные подарки запоминаются надолго. Мы&nbsp;создаем уникальные вещи, которые идеально отражают характер, увлечения или бренд. Отличный способ выделиться и&nbsp;порадовать близких, коллег или клиентов."
				/>
				<BlockList
					heading="Преимущества"
					list={advantages}
				/>
				<Gallery
					title="Полезные вещи для дома"
					loading={loading}
					error={error}
					data={data['useful']}
					description="3D-печать&nbsp;&mdash; это не&nbsp;только игрушки, но&nbsp;и&nbsp;практичность. Мы&nbsp;поможем напечатать недостающую деталь для бытовой техники, уникальный органайзер, подставку или любой другой аксессуар, который сделает вашу жизнь удобнее и&nbsp;организованнее."
				/>
				<BlockList
					heading="Хотите больше вдохновения?"
					subheading="Подписывайтесь на наши соцсети, чтобы первыми видеть новые работы, следить за процессом создания и перенимать лайфхаки из мира 3D-печати."
					list={socialList}
				/>
				<Gallery
					title="3d модели"
					loading={loading}
					error={error}
					data={data['model']}
					description="Для инженеров, дизайнеров и&nbsp;изобретателей. Мы&nbsp;беремся за&nbsp;создание сложных прототипов, функциональных деталей и&nbsp;архитектурных макетов. Используем профессиональные материалы для задач, где важна точность, прочность и&nbsp;детализация."
				/>
			</Index>
			<Popup onClose={ () => setIsShowPopup(false)} isShowPopup={ isShowPopup }>
				<FormOrder />
			</Popup>
		</>
	);
}

export default Home;
