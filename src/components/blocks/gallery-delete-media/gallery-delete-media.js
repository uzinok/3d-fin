import { useState, useRef } from "react";
import { Swiper } from "swiper/react";
import { A11y } from "swiper/modules";
import { StyledSwiperSlide, StyledSwiperContainer, StyledNavigationButton } from "../../layout/gallery-element/styles";
import Video from "../../ui/video/video";
import { StyledButtonDel } from "./styles";
import "swiper/css";
import VisuallyHidden from "../../ui/visually-hidden/visually-hidden";
import ReloadAnchor, { reloadAnchor } from "../../ui/reload-anchor/reload-anchor";

function FormDeleteMedia({ slide, block, scrollId }) {

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		fetch('/api/gallery-delete-media.php', {
			method: 'POST',
			body: formData,
		}).then(async (response) => {
			const data = await response.json();

			if (response.ok && data.success) {
				console.log('Media deleted successfully');
				console.log(scrollId);
				reloadAnchor(scrollId);
			} else {
				console.error('Failed to delete media');
			}
		}).catch((error) => {
			let errorMessage = 'Ошибка при отправке формы. Попробуйте повторить позже.';
			if (error instanceof SyntaxError) {
				console.error = 'Ошибка обработки ответа сервера';
			} else {
				console.error = error.message || errorMessage;
			}
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
		</form>
	)
}

function GalleryDeleteMedia({ gallery, block }) {
	const id = block + '-gallery';
	const [showButtons, setShowButtons] = useState(false);
	const [disabledNextButton, setDisabledNextButton] = useState(false);
	const [disabledPrevButton, setDisabledPrevButton] = useState(true);
	const swiperRef = useRef(null);

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
					{gallery.map((slide, index) => (
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
