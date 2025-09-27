import { useState, useRef, useMemo } from 'react';
import { Swiper } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { StyledSwiperSlide, StyledSwiperContainer, StyledNavigationButton } from './styles';
import Video from '../../ui/video/video';

import 'swiper/css';
import VisuallyHidden from '../../ui/visually-hidden/visually-hidden';

function GalleryElement({ gallery }) {
	const [showButtons, setShowButtons] = useState(false);
	const [disabledNextButton, setDisabledNextButton] = useState(false);
	const [disabledPrevButton, setDisabledPrevButton] = useState(true);
	const swiperRef = useRef(null);

	// Создаем перевернутую копию массива gallery только при его изменении
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
					slidesPerView={1}
					navigation
					breakpoints={{
						600: { slidesPerView: 2 },
						900: { slidesPerView: 3 }
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
};

export default GalleryElement;
