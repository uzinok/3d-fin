import Container from "../../layout/container/container";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef } from "react";
import { StyledList } from "./styles";
import EditHgroup from "../edit-hgroup/edit-hgroup";

function EditCard({ data, block }) {
	const iconRef = useRef(null);
	const cardTitleRef = useRef(null);
	const cardDescriptionRef = useRef(null);
	const cardHrefRef = useRef(null);
	const cardLinkTextRef = useRef(null);
	return (
		<li>
			<form>
				<input type="hidden" name="block" value={block} />
				<p> icon: {data.icon}
					<TextAreaForEdit
						ref={iconRef}
						defaultValue={data.icon}
						noMinHeight="true"
					/>
				</p>
				<p>title:
					<TextAreaForEdit
						ref={cardTitleRef}
						defaultValue={data.title}
						noMinHeight="true"
					/>
				</p>
				<p>description:
					<TextAreaForEdit
						ref={cardDescriptionRef}
						defaultValue={data.description}
						noMinHeight="true"
					/>
				</p>
				<p>href:
					<TextAreaForEdit
						ref={cardHrefRef}
						defaultValue={data.href}
						noMinHeight="true"
					/>
				</p>
				<p>linkText:
					<TextAreaForEdit
						ref={cardLinkTextRef}
						defaultValue={data.linkText}
						noMinHeight="true"
					/>
				</p>
			</form>
		</li>
	)
}

function EditBlockList({ data, block }) {

	return (
		<section>
			<Container>
				{data.title && (
					<EditHgroup
						data={data}
						block={block}
					/>
				)}
				{data.list && (
					<StyledList>
						{data.list.map((item, index) => (
							<EditCard
								key={index}
								data={item}
								block={block}
							/>
					))}
					</StyledList>
				)}
			</Container>
		</section>
	)
}

export default EditBlockList;
