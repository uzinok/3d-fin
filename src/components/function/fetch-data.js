import { response } from "../../mocks/response";

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

	return response;
};

export default fetchData;
