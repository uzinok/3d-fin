import { response } from "../../mocks/response";

const fetchGalleryData = async () => {
	// const data = {}
	// try {
	// 	const response = await fetch('get-gallery.php');

	// 	if (!response.ok) {
	// 		throw new Error('Network response was not ok');
	// 	}

	// 	const result = await response.json();

	// 	if (result.success) {
	// 		data.data = result.data;
	// 	} else {
	// 		data.error = result.message || 'Failed to fetch gallery data';
	// 	}
	// } catch (err) {
	// 	data.error = 'Error fetching gallery data:' + err;
	// } finally {
	// 	return data;
	// }
	return response
};

export default fetchGalleryData;
