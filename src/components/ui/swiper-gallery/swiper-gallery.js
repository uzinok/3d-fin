import { useState, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { A11y } from 'swiper/modules';

import { StyledSwiperSlide, StyledSwiperContainer, StyledSwiperContent, StyledNavigationButton } from './styles';

import 'swiper/css';

export const MySwiper = ({ gallery }) => {

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

	const handleVideoClick = (e) => {
		const video = e.target;

		if (video.paused || video.ended) {
			return video.play();
		}
		return video.pause();
	}

	return (
		gallery.length > 0 ? (
			<StyledSwiperContainer>{showButtons && (
				<StyledNavigationButton direction="prev" onClick={handleprev} disabled={disabledPrevButton} />
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
					{gallery.map((slide, index) => (
						<StyledSwiperSlide key={index}>
							{slide.type === 'video' ? (
								<StyledSwiperContent>
									<video
										src={slide.src}
										title={slide.title}
										poster={slide.poster}
										preload="none"
										muted
										loop
										onClick={handleVideoClick}
									/>
								</StyledSwiperContent>
							) : (
								<StyledSwiperContent>
									<img
										src={slide.src}
										alt={slide.title}
									/>
								</StyledSwiperContent>
							)}
						</StyledSwiperSlide>
					))}
				</Swiper>
				{showButtons && (
						<StyledNavigationButton direction="next" onClick={handleNext} disabled={disabledNextButton} />
				)}
			</StyledSwiperContainer>
		) : (
				<p>Нет Данных</p>
		)
	);
};
