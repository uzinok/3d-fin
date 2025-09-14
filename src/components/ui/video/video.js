import VisuallyHidden from "../visually-hidden/visually-hidden";
import { StyledVideoWrap, StyledButton, StyledDecorButton } from "./styles";
import { useRef, useState } from "react";

function Video({
	src,
	title,
	poster,
	preload,
	muted,
	loop }) {

	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlay = () => {
		videoRef.current.play();
		setIsPlaying(true);
	};

	const handlePause = () => {
		videoRef.current.pause();
		setIsPlaying(false);
	};

	return (
		<StyledVideoWrap>
			{!isPlaying ? (
				<StyledButton
					$icon="play"
					onClick={handlePlay}
					>
					<VisuallyHidden>Воспроизвести</VisuallyHidden>
					<StyledDecorButton />
				</StyledButton>
			) : (
				<StyledButton
				$icon="paused"
				onClick={handlePause}
				>
					<VisuallyHidden>Пауза</VisuallyHidden>
					<StyledDecorButton />
				</StyledButton>
			)}

			<video
				ref={videoRef}
				src={src}
				title={title}
				poster={poster}
				preload={preload}
				muted={muted}
				loop={loop}
				style={{border: 0}}
			/>
		</StyledVideoWrap>
	)
}

export default Video;
