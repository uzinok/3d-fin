import EditHgroup from "../edit-hgroup/edit-hgroup";
import UploadFile from "../upload-file/upload-file";
import GalleryDeleteMedia from "../gallery-delete-media/gallery-delete-media";
import Container from "../../layout/container/container";

function EditGallery({ data, loading, error }) {

	return (
		<section>
			<Container>
				<EditHgroup
					heading={data.title}
					subheading={data.subtitle}
				/>
				<UploadFile />
				<GalleryDeleteMedia
					loading={loading}
					error={error}
					gallery={data.items}
				/>
			</Container>
		</section>
	)
}

export default EditGallery;
