import UploadFile from "../upload-file/upload-file";
import Container from "../../../layout/container/container";

function EditGallery() {
	return (
		<section>
			<Container>
				<h2>Ваше воображение – наша печать!</h2>
				<UploadFile />
			</Container>
		</section>
	)
}

export default EditGallery;
