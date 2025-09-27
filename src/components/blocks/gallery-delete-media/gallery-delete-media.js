import { useState, useRef, useMemo, useEffect } from "react";
import { Swiper } from "swiper/react";
import { A11y } from "swiper/modules";
import { StyledSwiperSlide, StyledSwiperContainer, StyledNavigationButton } from "../../layout/gallery-element/styles";
import Video from "../../ui/video/video";
import { StyledButtonDel } from "./styles";
import "swiper/css";
import VisuallyHidden from "../../ui/visually-hidden/visually-hidden";
import ReloadAnchor, { reloadAnchor } from "../../ui/reload-anchor/reload-anchor";
import SubmitMessage, { colorMessage } from "../../ui/submit-message/submit-message";

function FormDeleteMedia({ slide, block, scrollId }) {
	const [messageText, setMessageText] = useState('');
	const [massageColor, setMassageColor] = useState('');

		useEffect(() => {
			window.setTimeout(() => {
				if (messageText) {
					setMessageText('');
				}
			}, 30000);
		}, [messageText]);

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		fetch('/api/gallery-delete-media.php', {
			method: 'POST',
			body: formData,
		}).then(async (response) => {
			const data = await response.json();

			if (response.ok && data.success) {
				setMessageText(data.message);
				setMassageColor(colorMessage.SUCCESS);
				reloadAnchor(scrollId);
			} else {
				setMessageText(data.message);
				setMassageColor(colorMessage.ERROR);
			}
		}).catch((error) => {
			let errorMessage = 'Ошибка при отправке формы. Попробуйте повторить позже.';
			if (error instanceof SyntaxError) {
				errorMessage = 'Ошибка обработки ответа сервера';
			} else {
				errorMessage = error.message || errorMessage;
			}

			setMessageText(errorMessage);
			setMassageColor(colorMessage.ERROR);
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<ReloadAnchor />
			<input type="hidden" name="block" value={block} />
			{slide.type === 'video' ? (
				<Video
					src={slide.src}
					title={slide.title}
					poster={slide.poster}
					preload="none"
					muted
					loop
				/>
			) : (
				<img
					src={slide.src}
					alt={slide.title}
				/>
			)}
			<StyledButtonDel type='submit'>удалить</StyledButtonDel>
			<input
				type="hidden"
				name="id"
				value={slide.id}
			/>
			{messageText && (
				<SubmitMessage
					color={massageColor}
				>
					{messageText}
				</SubmitMessage>
			)}
		</form>
	)
}

function GalleryDeleteMedia({ gallery, block }) {
	const id = block + '-gallery';
	const [showButtons, setShowButtons] = useState(false);
	const [disabledNextButton, setDisabledNextButton] = useState(false);
	const [disabledPrevButton, setDisabledPrevButton] = useState(true);
	const swiperRef = useRef(null);

	const reversedGallery = useMemo(() => {
			// Создаем копию массива и переворачиваем ее
			return [...gallery].reverse();
		}, [gallery]);

	const handleprev = () => {
		if (swiperRef.current && typeof swiperRef.current.swiper.slidePrev === "function") {
			swiperRef.current.swiper.slidePrev();
		}
	};

	const handleNext = () => {
		if (swiperRef.current && typeof swiperRef.current.swiper.slideNext === "function") {
			swiperRef.current.swiper.slideNext();
		}
	};

	if (!block) {
		return null
	}

	return (
		gallery.length > 0 ? (
			<StyledSwiperContainer id={id}>
				{showButtons && (
				<StyledNavigationButton direction="prev" onClick={handleprev} disabled={disabledPrevButton}>
					<VisuallyHidden>Назад</VisuallyHidden>
				</StyledNavigationButton>
			)}
				<Swiper
					ref={swiperRef}
					modules={[A11y]}
					spaceBetween={20}
					slidesPerView={2}
					navigation
					breakpoints={{
						600: { slidesPerView: 3 },
						900: { slidesPerView: 4 }
					}}
					onInit={(swiper) => {
						const updateShowButtons = () => {
							const countSlides = swiper.params.slidesPerView;
							setShowButtons(gallery.length > countSlides);
						}
						updateShowButtons();
						swiper.on('resize', updateShowButtons);
					}}
					onSlideChange={(swiper) => {
						setDisabledPrevButton(swiper.isBeginning);
						setDisabledNextButton(swiper.isEnd);
					}}
				>
					{reversedGallery.map((slide, index) => (
						<StyledSwiperSlide key={index}>
							<FormDeleteMedia slide={slide} block={block} scrollId={id} />
						</StyledSwiperSlide>
					))}
				</Swiper>
				{showButtons && (
					<StyledNavigationButton direction="next" onClick={handleNext} disabled={disabledNextButton}>
						<VisuallyHidden>Вперед</VisuallyHidden>
					</StyledNavigationButton>
				)}
			</StyledSwiperContainer>
		) : (
			<p>Нет Данных</p>
		)
	);
}

export default GalleryDeleteMedia;
