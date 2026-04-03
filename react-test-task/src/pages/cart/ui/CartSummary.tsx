import type { FC } from 'react';

interface CartSummaryProps {
    subTotal: number;
    discount: number;
    totalSum: number;
    promo: string;
    onPromoChange: (value: string) => void;
    onApplyPromo: () => void;
    appliedPromoCode: string | null;
    appliedPromoDiscount: number;
    onClearCart: () => void;
    onCheckout: () => void;
}

export const CartSummary: FC<CartSummaryProps> = ({
    subTotal,
    discount,
    totalSum,
    promo,
    onPromoChange,
    onApplyPromo,
    appliedPromoCode,
    appliedPromoDiscount,
    onClearCart,
    onCheckout
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
                <div className="border border-gray-200 p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Промокод</h3>
                    <div className="flex gap-2">
                        <input 
                            type="text"
                            placeholder="ВВЕДИТЕ КОД (SALE10)..."
                            value={promo}
                            onChange={(e) => onPromoChange(e.target.value)}
                            className="flex-1 border-2 border-gray-900 px-4 py-2 text-sm uppercase font-bold outline-none focus:bg-gray-50"
                        />
                        <button 
                            onClick={onApplyPromo}
                            className="bg-gray-900 text-white px-6 py-2 text-xs font-bold uppercase hover:bg-gray-800 transition-colors"
                        >
                            Применить
                        </button>
                    </div>
                    {appliedPromoCode && (
                        <p className="text-[10px] font-bold text-green-600 uppercase">
                            Промокод {appliedPromoCode} на -{appliedPromoDiscount}% успешно применен!
                        </p>
                    )}
                </div>
                <button
                    onClick={onClearCart}
                    className="text-gray-400 hover:text-red-600 text-[10px] uppercase font-bold tracking-widest transition-colors flex items-center gap-2"
                >
                    Очистить корзину —
                </button>
            </div>

            <div className="border-t-4 border-gray-900 lg:border-t-0 lg:border-l-4 lg:pl-12 pt-8 lg:pt-0 space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold uppercase text-gray-400">Подытог:</span>
                        <span className="text-xl font-bold font-mono">{subTotal} руб.</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between items-baseline text-green-600">
                            <span className="text-xs font-bold uppercase">Скидка ({appliedPromoDiscount}%):</span>
                            <span className="text-xl font-bold font-mono">-{discount} руб.</span>
                        </div>
                    )}
                    <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                        <span className="text-sm font-bold uppercase tracking-wider">Итого к оплате:</span>
                        <span className="text-5xl font-extrabold tracking-tighter border-b-4 border-black">
                            {totalSum} Р.
                        </span>
                    </div>
                </div>
                
                <button 
                    className="w-full bg-gray-900 text-white px-12 py-5 font-bold hover:bg-gray-800 transition-all uppercase tracking-[0.2em] transform active:scale-95 text-lg"
                    onClick={onCheckout}
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};
