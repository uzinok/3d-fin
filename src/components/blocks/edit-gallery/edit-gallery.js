import EditHgroup from "../edit-hgroup/edit-hgroup";
import UploadFile from "../upload-file/upload-file";
import GalleryDeleteMedia from "../gallery-delete-media/gallery-delete-media";
import Container from "../../layout/container/container";

function EditGallery({ heading, subheading, loading, error, gallery }) {
	return (
		<section>
			<Container>
				<EditHgroup
					heading={heading}
					subheading={subheading}
				/>
				<UploadFile />
				<GalleryDeleteMedia
					loading={loading}
					error={error}
					gallery={gallery}
				/>
			</Container>
		</section>
	)
}

export default EditGallery;
