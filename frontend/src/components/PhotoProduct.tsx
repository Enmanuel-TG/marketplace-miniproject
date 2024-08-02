import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SliderProps {
  images: string[];
}

const PhotoProduct = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden relative h-64">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'} ${index < currentIndex ? '-translate-x-full' : ''}`}
            style={{ transitionDuration: '500ms' }}
          >
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PhotoProduct;
