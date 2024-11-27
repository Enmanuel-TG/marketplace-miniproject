import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SliderProps {
  images: string[];
}

const PhotoProduct = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMultipleImages, setHasMultipleImages] = useState(images.length > 1);

  useEffect(() => {
    setHasMultipleImages(images.length > 1);
  }, [images]);

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
      <div className="overflow-hidden relative h-96 flex items-center justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform transform ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            } ${index < currentIndex ? '-translate-x-full' : ''}`}
            style={{ transitionDuration: '500ms' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        ))}
      </div>
      {hasMultipleImages && (
        <>
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
        </>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg" onClick={() => setIsModalOpen(false)}>
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
              className="w-[1000px] h-[650px] object-contain"
            />
            <button
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoProduct;
