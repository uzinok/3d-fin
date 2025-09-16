function getTopLeftCoordinates(elem) {
	const rect = elem.getBoundingClientRect();
	return {
		top: rect.top - 5,
		left: rect.left,
	};
}

export default getTopLeftCoordinates;
