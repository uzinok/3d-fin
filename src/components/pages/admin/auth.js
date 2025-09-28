const DEV_MODE = true;

export const isAuthenticated = () => {
	if (DEV_MODE) {
		return true;
	}
	return localStorage.getItem('isAuthenticated') === 'true';
};

export const login = async (username, password) => {
	if (DEV_MODE) {
		localStorage.setItem('isAuthenticated', 'true');
		return { success: true };
	}

	try {
		// Создаем FormData вместо JSON
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);

		const response = await fetch('api/auth.php', {
			method: 'POST',
			// Убираем заголовок Content-Type, браузер сам установит с boundary для FormData
			body: formData,
		});

		const result = await response.json();

		if (result.success) {
			localStorage.setItem('isAuthenticated', 'true');
		}

		return result;
	} catch (error) {
		return { success: false, message: 'Ошибка соединения' };
	}
};

export const logout = () => {
	localStorage.removeItem('isAuthenticated');
};
