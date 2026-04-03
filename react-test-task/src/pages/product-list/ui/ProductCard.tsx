import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../../entities/product/model';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const firstColor = product.colors[0];
    const firstImage = firstColor?.images[0];
    const minPrice = Math.min(...product.colors.map(c => Number(c.price)));

    return (
        <Link
            to={`/product/${product.id}?color=${firstColor.id}`}
            className="group block"
        >
            <div className="aspect-square border border-gray-200 bg-white mb-3 overflow-hidden flex items-center justify-center transition-colors group-hover:border-gray-900">
                {firstImage ? (
                    <img
                        src={firstImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                    />
                ) : (
                    <div className="text-xs text-gray-300 uppercase">Нет фото</div>
                )}
            </div>
            <h2 className="text-sm font-bold uppercase tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                {product.name}
            </h2>
            <div className="flex justify-between items-center mt-1">
                <p className="text-[10px] text-gray-400 uppercase">
                    {product.brand}
                </p>
                <p className="text-xs font-bold font-mono text-gray-800">
                    от {minPrice} р.
                </p>
            </div>
        </Link>
    );
};
