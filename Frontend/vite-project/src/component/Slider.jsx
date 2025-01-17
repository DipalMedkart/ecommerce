import { useState, useEffect } from 'react';
import '../pages/style/Slider.css';

const images = [
    'https://res.cloudinary.com/dly8ti3co/image/upload/v1737090623/products/slfv161trdeinyuezsbr.webp',
    // 'https://res.cloudinary.com/dly8ti3co/image/upload/v1737096111/products/baoon0sf89so6d7urlrl.webp',
    'https://res.cloudinary.com/dly8ti3co/image/upload/v1737090604/products/k2whgzh8acaql8knyktc.jpg',
    'https://res.cloudinary.com/dly8ti3co/image/upload/v1737096618/products/q1h8iqcfxywt860magjt.jpg',
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3500); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <div className="slider-container">
            <div className="slider" style={{
                transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
            }}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="slider-image"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
