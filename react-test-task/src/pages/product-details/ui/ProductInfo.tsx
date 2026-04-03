import type { FC } from 'react';

interface ProductInfoProps {
    name: string;
    brand: string;
    price: number | string;
    description: string;
}

export const ProductInfo: FC<ProductInfoProps> = ({ name, brand, price, description }) => {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tighter uppercase">{name}</h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{brand}</p>
            </div>

            <div className="text-4xl font-black font-mono border-b-4 border-gray-900 pb-2 inline-block">
                {price} Р.
            </div>

            <div className="pt-4">
                <p className="text-sm leading-relaxed text-gray-600 border-l-2 border-gray-100 pl-4">
                    {description || 'НЕТ ОПИСАНИЯ'}
                </p>
            </div>
        </div>
    );
};
