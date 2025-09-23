import Container from "../../layout/container/container";
import Hgroup from "../../layout/hgroup/hgroup";
import SubTitle from "../../ui/subtitle/subtitle";
import Title from "../../ui/title/title";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef } from "react";
import { StyledList } from "./styles";

function EditCard({ key, data }) {
	const iconRef = useRef(null);
	const cardTitleRef = useRef(null);
	const cardDescriptionRef = useRef(null);
	const cardHrefRef = useRef(null);
	const cardLinkTextRef = useRef(null);
	return (
		<li key={key}>
			<form>
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

function EditBlockList({ data }) {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);

	return (
		<section>
			<Container>
				{data.title && (
					<Hgroup>
						<Title>
							<TextAreaForEdit
								ref={titleRef}
								defaultValue={data.title}
							/>
						</Title>
							<SubTitle>
								<TextAreaForEdit
									ref={subTitleRef}
									defaultValue={data.subtitle}
								/>
							</SubTitle>
					</Hgroup>
				)}
				{data.list && (
					<StyledList>
						{data.list.map((item, index) => (
							<>
								<EditCard
									key={index}
									data={item}
								/>
							</>
					))}
					</StyledList>
				)}
			</Container>
		</section>
	)
}

export default EditBlockList;
