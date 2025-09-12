import Header from "../header/header";
import LinkIcon, { icons } from "../../ui/link-icon/link-icon";
import Main from "../main/main";
import Footer from "../footer/footer";


function Index({ children }) {
	return (
		<>
			<Header>
				<LinkIcon
					title="Telegram канал"
					href="https://t.me/kanalzanjat"
					target="_blank"
					rel="noopener noreferrer"
					$icon={icons.TELEGRAM}
					as="span"
				>
					Telegram
				</LinkIcon>
				<LinkIcon
					title="Youtube канал"
					href='https://youtube.com/@unnecessary-set-of-letters'
					target="_blank"
					rel="noopener noreferrer"
					$icon={icons.YOUTUBE}
				>
					Youtube
				</LinkIcon>
			</Header>
			<Main>
				{children}
			</Main>
			<Footer>footer</Footer>
		</>
	)
}

export default Index;
