import type { FC } from 'react';
import type { Color, Product } from '../../../entities/product/model';
import type { Size } from '../../../entities/size/model';

interface VariantSelectorProps {
    product: Product;
    currentColor: Color;
    availableSizes: Size[];
    selectedSizeId: number | null;
    onColorChange: (colorId: number) => void;
    onSizeChange: (sizeId: number) => void;
    onAddToCart: () => void;
}

export const VariantSelector: FC<VariantSelectorProps> = ({
    product,
    currentColor,
    availableSizes,
    selectedSizeId,
    onColorChange,
    onSizeChange,
    onAddToCart
}) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Выберите цвет</h3>
                <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                        <button
                            key={color.id}
                            onClick={() => onColorChange(color.id)}
                            className={`px-5 py-2 border-2 transition-all uppercase text-xs font-bold tracking-widest ${color.id === currentColor.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-900 border-gray-100 hover:border-gray-900'}`}
                        >
                            {color.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Выберите размер</h3>
                <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                        <button
                            key={size.id}
                            onClick={() => onSizeChange(size.id)}
                            className={`min-w-12 h-10 border-2 transition-all font-mono font-bold text-sm ${size.id === selectedSizeId ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-900 border-gray-100 hover:border-gray-900'}`}
                        >
                            {size.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <button
                    disabled={!selectedSizeId}
                    onClick={onAddToCart}
                    className={`w-full py-5 border-4 font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${selectedSizeId ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800' : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'}`}
                >
                    {selectedSizeId ? 'ДОБАВИТЬ В КОРЗИНУ' : 'ВЫБЕРИТЕ РАЗМЕР'}
                </button>
            </div>
        </div>
    );
};
