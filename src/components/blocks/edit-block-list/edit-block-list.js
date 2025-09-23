import Container from "../../layout/container/container";
import Hgroup from "../../layout/hgroup/hgroup";
import SubTitle from "../../ui/subtitle/subtitle";
import Title from "../../ui/title/title";
import TextAreaForEdit from "../../ui/form-elements/textarea-for-edit/textarea-for-edit";
import { useRef } from "react";
import { StyledList } from "./styles";

function EditBlockList({ data }) {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);
	const iconRef = useRef(null);
	const cardTitleRef = useRef(null);
	const cardDescriptionRef = useRef(null);
	const cardHrefRef = useRef(null);
	const cardLinkTextRef = useRef(null);

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
						<li key={index}>
							<p key={index}>icon: {item.icon}
								<TextAreaForEdit
									key={index}
									ref={iconRef}
									defaultValue={item.icon}
									noMinHeight="true"
								/>
							</p>
							<p>title:
								<TextAreaForEdit
									ref={cardTitleRef}
									defaultValue={item.title}
									noMinHeight="true"
								/>
							</p>
							<p>description:
								<TextAreaForEdit
									ref={cardDescriptionRef}
									defaultValue={item.description}
									noMinHeight="true"
								/>
							</p>
							<p>href:
								<TextAreaForEdit
									ref={cardHrefRef}
									defaultValue={item.href}
									noMinHeight="true"
								/>
							</p>
							<p>linkText:
								<TextAreaForEdit
									ref={cardLinkTextRef}
									defaultValue={item.linkText}
									noMinHeight="true"
								/>
							</p>
						</li>
					))}
					</StyledList>
				)}
			</Container>
		</section>
	)
}

export default EditBlockList;
