import { useEffect } from 'react';

export function reloadAnchor(id) {
	if (id) {
		// Сохраняем блок в sessionStorage перед перезагрузкой
		sessionStorage.setItem('scrollToBlock', id);
		// Перезагружаем страницу
		window.location.reload();
	}
}

// Код, который выполнится после перезагрузки страницы
function ReloadAnchor() {
	useEffect(() => {
		// Проверяем, есть ли сохраненный блок для прокрутки
		const id = sessionStorage.getItem('scrollToBlock');

		if (id) {
			// Прокручиваем к блоку
			window.setTimeout(() => {
				const element = document.getElementById(id);
				element.scrollIntoView();
			}, 50)
			// Удаляем запись из storage
			sessionStorage.removeItem('scrollToBlock');
		}
	}, [])
}

export default ReloadAnchor;
