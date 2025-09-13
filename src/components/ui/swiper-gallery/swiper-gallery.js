import { A11y } from 'swiper/modules';

import { Swiper } from 'swiper/react';
import { StyledSwiperSlide } from './styles';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export const MySwiper = ({ gallery }) => {
	return (
		gallery.length > 0 ? (
			<Swiper
				modules={[A11y]}
				spaceBetween={20}
				slidesPerView={1}
				navigation
				breakpoints={{
					600: { slidesPerView: 2 },
					900: { slidesPerView: 3 }
				}}
			>
				{gallery.map((slide, index) => (
					<StyledSwiperSlide key={index}>
						{slide.type === 'video' ? (
							<video src={slide.src} title={slide.title} controls/>
						) : (
							<img src={slide.src} alt={slide.title} />
						)}
					</StyledSwiperSlide>
				))}
			</Swiper>
		) : (
				<p>Нет Данных</p>
		)
	);
};
