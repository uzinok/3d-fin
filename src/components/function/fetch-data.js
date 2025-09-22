const fetchData = async () => {
	try {
		const response = await fetch('/api/fetchData.php');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		return result;

	} catch (error) {
		console.error('Error fetching data:', error);
		return { error: 'Ошибка при загрузке данных' };
	}
};

export default fetchData;
