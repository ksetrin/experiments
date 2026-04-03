import type { FC } from 'react';

interface ImageGalleryProps {
    images: string[];
    activeIndex: number;
    onIndexChange: (index: number) => void;
}

export const ImageGallery: FC<ImageGalleryProps> = ({ images, activeIndex, onIndexChange }) => {
    return (
        <section className="flex-1">
            <div className="border border-gray-300 mb-2 aspect-square flex items-center justify-center overflow-hidden bg-white">
                <img
                    src={images[activeIndex]}
                    className="w-full h-full object-contain p-4"
                    alt="Product preview"
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                    <button
                        key={img}
                        onClick={() => onIndexChange(idx)}
                        className={`w-16 h-16 border-2 flex-shrink-0 transition-colors ${idx === activeIndex ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <img src={img} className="w-full h-full object-contain p-1" alt="" />
                    </button>
                ))}
            </div>
        </section>
    );
};
