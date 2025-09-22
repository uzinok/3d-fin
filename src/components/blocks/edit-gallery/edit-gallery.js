import EditHgroup from "../edit-hgroup/edit-hgroup";
import UploadFile from "../upload-file/upload-file";
import GalleryDeleteMedia from "../gallery-delete-media/gallery-delete-media";

function EditGallery({ heading, subheading, loading, error, gallery }) {
	return (
		<div>
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
		</div>
	)
}

export default EditGallery;
