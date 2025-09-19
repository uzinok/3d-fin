import { StyledList, StyledCard, StyledIcon } from "./styles";

function CardList({ list }) {
	return (
		list.length > 0 && (
			<StyledList>
				{list.map((item, index) => (
					<li key={index}>
						{item.href ? (
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								<StyledCard>
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
								</StyledCard>
							</a>
						) : (
							<StyledCard>
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
							</StyledCard>
						)}

					</li>
				))}
			</StyledList>
		)
	)
}

export default CardList;
