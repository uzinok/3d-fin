import EditHgroup from "../edit-hgroup/edit-hgroup";
import UploadFile from "../upload-file/upload-file";
import GalleryDeleteMedia from "../gallery-delete-media/gallery-delete-media";
import Container from "../../layout/container/container";

function EditGallery({ data, block }) {

	if (!block) {
		return null;
	}

	return (
		<section>
			<Container>
				<EditHgroup
					block={block}
					data={data}
				/>
				<UploadFile block={block} />
				<GalleryDeleteMedia
					gallery={data.items}
					block={block}
				/>
			</Container>
		</section>
	)
}

export default EditGallery;
