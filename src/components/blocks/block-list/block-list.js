import Container from "../../layout/container/container";
import Hgroup from "../../layout/hgroup/hgroup";
import Title from "../../ui/title/title";
import CardList from "../../layout/card-list/card-list";
import SubTitle from "../../ui/subtitle/subtitle";

function BlockList({ list, heading, subheading }) {

	return (
		<section>
			<Container>
				<Hgroup>
					{heading && (
						<Title as='h2'>{heading}</Title>
					)}
					{subheading && (
						<SubTitle>{ subheading }</SubTitle>
					)}
				</Hgroup>
				{Object.keys(list).length && (
					<CardList list={list.items} />
				)}
			</Container>
		</section>
	)
}

export default BlockList;
