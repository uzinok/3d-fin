import { useState, useRef } from "react";
import { Swiper } from "swiper/react";
import { A11y } from "swiper/modules";
import { StyledSwiperSlide, StyledSwiperContainer, StyledNavigationButton } from "../../layout/gallery-element/styles";
import Video from "../../ui/video/video";
import { StyledButtonDel } from "./styles";
import "swiper/css";
import VisuallyHidden from "../../ui/visually-hidden/visually-hidden";

function GalleryDeleteMedia({ gallery, block }) {

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
			<StyledSwiperContainer>{showButtons && (
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
							<form>
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
							<StyledButtonDel type='button'>удалить</StyledButtonDel>
							</form>
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
