// function/fetchData.js

const fetchData = async () => {
	try {
		const response = await fetch('/api/fetch-data.php', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		});

		if (!response.ok) {
			// Если PHP API не работает, пробуем статический JSON
			return await fetchStaticData();
		}

		const data = await response.json();
		return data;

	} catch (error) {
		console.error('Error fetching from PHP API:', error);
		// Fallback на статические данные
		return await fetchStaticData();
	}
};

// Функция для загрузки статических данных
const fetchStaticData = async () => {
	try {
		const response = await fetch('/api/data.json');
		if (response.ok) {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.error('Error fetching static data:', error);
	}

	// Ultimate fallback - встроенные данные
	return getFallbackData();
};

// Резервные данные
const getFallbackData = () => {
	console.log('Using fallback data');
	return {
		data: {
			advantages: {
				heading: "Преимущества",
				list: [
					{
						id: 1,
						title: "Высокий контакт",
						description: "Контакты с компьютером. Тренировка передачи для защиты. Поддержка передачи к перевозке данных.",
						icon: "",
						href: null,
						linkText: null
					},
					{
						id: 2,
						title: "Эксклюзивные модели",
						description: "Добавить следует только с автомобилем в виде любых подростков или любых больше вещей.",
						icon: "",
						href: null,
						linkText: null
					},
					{
						id: 3,
						title: "Ручная цеха",
						description: "Бетономерное кабель для высоких измерений. Наконец, чтобы разложить все вперед, нужно выйти.",
						icon: "",
						href: null,
						linkText: null
					}
				]
			},
			socialList: {
				title: "Хотите больше вдохновения?",
				subtitle: "Подписывайтесь на наш концепт, чтобы первым видеть новые работы, следить за процессом создания и переживать диффака из мира 30-печати.",
				items: [
					{
						id: 1,
						icon: "",
						title: "Наш Тибулин связи",
						description: "Стало точным моделей и задачей точного обозначения компьютера и точного редактора.",
						href: "#",
						linkText: "Подключение..."
					},
					{
						id: 2,
						icon: "",
						title: "Моя YouTube связи",
						description: "Автомобиль управления моделей. Область готовых работ и подробностей по функциям.",
						href: "#",
						linkText: "Смотрите..."
					}
				]
			},
			gallery: {
				other: {
					title: "Сувениры и подарки",
					subtitle: "Переманированные подарки заполняются надолго. Мы создаем уникальные вещи, которые идеально отражают характер, увлечения или бренд. Отличный способ выделяться и продумать близких, коллег или клиентов.",
					items: []
				},
				useful: {
					title: "Полезные вещи для дома",
					subtitle: "30-месяц — это не только мутризм, но и практичность. Мы положим недостаток энергетических деталей, для бытовой техники, уникальный руководству, подставку или любой другой анекдотор, который сделает вашу жизнь удобнее и организовывает.",
					items: []
				},
				model: {
					title: "3d модели",
					subtitle: "Для инженеров, дизайнеров и изобретателей. Мы беремся за создание сложных прототипов, функциональных деталей и архитектурных макетов. Используем профессиональные материалы для задач, где важна точность, прочность и детализация.",
					items: []
				}
			}
		}
	};
};

export default fetchData;
