import { useState, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { A11y } from 'swiper/modules';

import { StyledSwiperSlide, StyledSwiperContainer, StyledSwiperContent, StyledNavigationButton } from './styles';

import 'swiper/css';

export const MySwiper = ({ gallery }) => {

	const [showButtons, setShowButtons] = useState(false);
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

	return (
		gallery.length > 0 ? (
			<StyledSwiperContainer>
				<Swiper
					ref={swiperRef}
					modules={[A11y]}
					loop={true}
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
				>
					{gallery.map((slide, index) => (
						<StyledSwiperSlide key={index}>
							{slide.type === 'video' ? (
								<StyledSwiperContent>
									<video
										src={slide.src}
										title={slide.title}
										controls
										poster={slide.poster}
										preload="metadata"
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
					<>
						<StyledNavigationButton direction="next" onClick={handleNext}/>
						<StyledNavigationButton direction="prev" onClick={handleprev}/>
					</>
				)}
			</StyledSwiperContainer>
		) : (
				<p>Нет Данных</p>
		)
	);
};
