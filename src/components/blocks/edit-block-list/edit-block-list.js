import Container from "../../layout/container/container";
import Hgroup from "../../layout/hgroup/hgroup";
import SubTitle from "../../ui/subtitle/subtitle";
import Title from "../../ui/title/title";

function EditBlockList({ data }) {
	console.log(data);

	return (
		<section>
			<Container>
				{data.title && (
					<Hgroup>
						<Title>
							{data.title}
						</Title>
						{data.subtitle && (
							<SubTitle>
								{data.subtitle}
							</SubTitle>
						)}
					</Hgroup>
				)}
				{data.items && (
					<ul>
					{data.items.map((item, index) => (
						<li key={index}>
							<p>icon: {item.icon}</p>
							<p>title: {item.title}</p>
							<p>description: {item.description}</p>
							<p>href: {item.href}</p>
							<p>linkText: {item.linkText}</p>
						</li>
					))}
					</ul>
				)}
			</Container>
		</section>
	)
}

export default EditBlockList;
