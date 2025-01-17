import { useState, useEffect, useRef } from 'react';
import '../pages/style/Slider.css';
import 'react-slideshow-image/dist/styles.css'
import {Slide} from 'react-slideshow-image'
 
const images = [
  'https://res.cloudinary.com/dly8ti3co/image/upload/v1737090623/products/slfv161trdeinyuezsbr.webp',
  'https://res.cloudinary.com/dly8ti3co/image/upload/v1737090627/products/iu6g7hnccc6v8ggxkyhi.webp',
  'https://res.cloudinary.com/dly8ti3co/image/upload/v1737090604/products/k2whgzh8acaql8knyktc.jpg',
];

const Slider = () => {
    const properties = {
        duration: 3000, // Slide transition time
        transitionDuration: 500, // Transition speed
        infinite: true, // Infinite loop
        arrows: true, // Display navigation arrows
        indicators: true, // Display navigation dots
        scale: 1.1, // Scale effect for images
        easing: "ease-in-out", // Transition easing
      };

  return (
    <Slide {...properties}>
      {images.map((image, index) => (
        <div key={index} className="each-slide-effect">
          <div
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            {/* Optionally add text on top of the image */}
            <span>Slide {index + 1}</span>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Slider;
