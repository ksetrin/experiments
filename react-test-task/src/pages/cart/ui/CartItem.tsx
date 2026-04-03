import type { FC } from 'react';

interface CartItemProps {
    productId: number;
    colorId: number;
    sizeId: number;
    name: string;
    colorName: string;
    sizeName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    onUpdateQuantity: (productId: number, colorId: number, sizeId: number, newQuantity: number) => void;
    onRemove: (productId: number, colorId: number, sizeId: number) => void;
}

export const CartItem: FC<CartItemProps> = ({
    productId,
    colorId,
    sizeId,
    name,
    colorName,
    sizeName,
    price,
    quantity,
    imageUrl,
    onUpdateQuantity,
    onRemove
}) => {
    return (
        <article className="border border-gray-200 flex flex-col group hover:border-gray-900 transition-colors">
            <div className="aspect-square bg-white border-b border-gray-100 overflow-hidden flex items-center justify-center p-4">
                <img 
                    src={imageUrl} 
                    alt={name} 
                    className="w-full h-full object-contain"
                />
            </div>
            
            <div className="p-5 flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-tight">{name}</h2>
                        <div className="text-[10px] uppercase text-gray-500 mt-1 space-y-0.5 font-mono">
                            <p>Цвет: {colorName}</p>
                            <p>Размер: {sizeName}</p>
                        </div>
                    </div>
                    <span className="text-sm font-bold font-mono bg-gray-100 px-2 py-1">
                        {price} р.
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => onUpdateQuantity(productId, colorId, sizeId, quantity - 1)}
                        className="w-8 h-8 border-2 border-gray-200 flex items-center justify-center font-bold hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="font-mono font-bold w-6 text-center">{quantity}</span>
                    <button 
                        onClick={() => onUpdateQuantity(productId, colorId, sizeId, quantity + 1)}
                        className="w-8 h-8 border-2 border-gray-200 flex items-center justify-center font-bold hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>

                <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-gray-400 font-bold">Сумма</span>
                        <span className="text-xl font-bold font-mono">
                            {price * quantity} руб.
                        </span>
                    </div>
                    <button
                        onClick={() => onRemove(productId, colorId, sizeId)}
                        className="text-red-600 text-[10px] uppercase font-bold hover:underline"
                    >
                        [ Удалить ]
                    </button>
                </div>
            </div>
        </article>
    );
};
