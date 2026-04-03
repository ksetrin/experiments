import { useState } from 'react';
import { useCartStore } from '../../../entities/cart/model/store.ts';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export function CartPage() {
    const { items, removeItem, clearCart, updateQuantity } = useCartStore();
    const [promo, setPromo] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = appliedPromo ? Math.floor(subTotal * (appliedPromo.discount / 100)) : 0;
    const totalSum = subTotal - discount;

    const handleApplyPromo = () => {
        if (promo.toUpperCase() === 'SALE10') {
            setAppliedPromo({ code: 'SALE10', discount: 10 });
            setPromo('');
        } else {
            alert('Неверный промокод. Попробуйте SALE10');
        }
    };

    if (items.length === 0) {
        return (
            <div className="p-20 text-center space-y-8">
                <h1 className="text-4xl font-black uppercase tracking-tighter">ВАША КОРЗИНА ПУСТА</h1>
                <Link to="/" className="inline-block border-4 border-gray-900 px-10 py-4 font-black hover:bg-gray-100 transition-all uppercase tracking-widest">
                    ВЕРНУТЬСЯ В КАТАЛОГ
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-12 pb-20">
            <h1 className="text-4xl font-black border-b-8 border-gray-900 pb-2 inline-block tracking-tighter uppercase">
                КОРЗИНА
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                    <CartItem 
                        key={`${item.productId}-${item.colorId}-${item.sizeId}`}
                        {...item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                    />
                ))}
            </div>

            <CartSummary 
                subTotal={subTotal}
                discount={discount}
                totalSum={totalSum}
                promo={promo}
                onPromoChange={setPromo}
                onApplyPromo={handleApplyPromo}
                appliedPromoCode={appliedPromo?.code || null}
                appliedPromoDiscount={appliedPromo?.discount || 0}
                onClearCart={clearCart}
                onCheckout={() => alert('ЗАКАЗ ОФОРМЛЕН! (ИМИТАЦИЯ)')}
            />
        </div>
    );
}
