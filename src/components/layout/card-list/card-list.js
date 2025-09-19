import { StyledList, StyledIcon, StyledCardLink } from "./styles";

function CardList({ list }) {
	return (
		list.length > 0 && (
			<StyledList>
				{list.map((item, index) => (
					<li key={index}>
						{item.href ? (
							<StyledCardLink href={item.href}>
								{item.icon && (
									<StyledIcon>{item.icon}</StyledIcon>
								)}
								{item.title && (
									<h3>{item.title}</h3>
								)}
								{item.description && (
									<p>{item.description}</p>
								)}
								{item.href && (
									<span>{item.linkText || "Read more"}</span>
								)}
							</StyledCardLink>
						) : (
								<>
									{item.icon && (
										<StyledIcon>{item.icon}</StyledIcon>
									)}
									{item.title && (
										<h3>{item.title}</h3>
									)}
									{item.description && (
										<p>{item.description}</p>
									)}
									{item.href && (
										<span>{item.linkText || "Read more"}</span>
									)}
								</>
						)}

					</li>
				))}
			</StyledList>
		)
	)
}

export default CardList;
