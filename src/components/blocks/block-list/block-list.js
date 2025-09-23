import Container from "../../layout/container/container";
import Hgroup from "../../layout/hgroup/hgroup";
import Title from "../../ui/title/title";
import CardList from "../../layout/card-list/card-list";
import SubTitle from "../../ui/subtitle/subtitle";

function BlockList({ data }) {

	return (
		<section>
			<Container>
				{data && (
					<>
						<Hgroup>
							{data.title && (
								<Title as='h2'>{data.title}</Title>
							)}
							{data.subtitle && (
								<SubTitle>{data.subtitle }</SubTitle>
							)}
						</Hgroup>
						{data.list.length > 0 && (
							<CardList list={data.list} />
						)}
					</>
				)}
			</Container>
		</section>
	)
}

export default BlockList;
