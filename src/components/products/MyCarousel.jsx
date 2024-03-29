import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ images = [] }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {
                images && images.map((image) => (
                    <img src={image} alt="productImage" />
                ))
            }
        </Slider>
    );
};

export default Carousel;
