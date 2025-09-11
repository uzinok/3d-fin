import Header from "../../layout/header/header";
import LinkIcon, { icons } from "../../ui/link-icon/link-icon";


function Index() {
	return (
		<>
			<Header>
				<LinkIcon
					title="Telegram канал"
					href="https://t.me/kanalzanjat"
					target="_blank"
					rel="noopener noreferrer"
					$icon={icons.TELEGRAM}
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
			<p>test</p>
		</>
	)
}

export default Index;
