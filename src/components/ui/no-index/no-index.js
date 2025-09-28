import { useEffect } from 'react';

const NoIndex = () => {
	useEffect(() => {
		// Создаем мета-тег
		const meta = document.createElement('meta');
		meta.name = 'robots';
		meta.content = 'noindex';
		document.head.appendChild(meta);

		// Удаляем мета-тег при размонтировании
		return () => {
			document.head.removeChild(meta);
		};
	}, []);

	return null;
};

export default NoIndex;
