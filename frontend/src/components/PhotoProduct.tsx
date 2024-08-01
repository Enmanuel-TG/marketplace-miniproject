import { ChevronLeft, ChevronRight } from 'react-feather';
import { useState, forwardRef, ForwardRefRenderFunction } from 'react';

interface Props {
  imgs: string[];
}

const PhotoProduct: ForwardRefRenderFunction<HTMLDivElement, Props> = ({ imgs }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex(currentIndex === 0 ? imgs.length - 1 : currentIndex - 1);
  };

  const next = () => {
    setCurrentIndex(currentIndex === imgs.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="overflow-hidden w-full h-96 relative m-auto" ref={ref}>
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >{imgs}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

const ForwardedPhotoProduct = forwardRef(PhotoProduct);
ForwardedPhotoProduct.displayName = 'PhotoProduct';

export default ForwardedPhotoProduct;
