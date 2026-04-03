import { Link, Outlet } from 'react-router-dom';
import { useCartStore } from '../../../entities/cart/model/store.ts';

export function MainLayout() {
  const itemsCount = useCartStore((state) => 
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const totalCost = useCartStore((state) => 
    state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-mono">
      <header className="border-b border-gray-200 p-4 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tighter">
            ITCASE <span className="font-normal text-gray-400">/ SHOP</span>
          </Link>
          
          <Link 
            to="/cart" 
            className="border border-gray-900 px-4 py-2 hover:bg-gray-100 transition-colors uppercase font-bold"
          >
            КОРЗИНА ({itemsCount} / {totalCost} руб)
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
