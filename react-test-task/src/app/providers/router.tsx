import { createBrowserRouter } from 'react-router-dom';
import { ProductsPage } from '../../pages/product-list/ui/Page.tsx';
import { ProductDetailsPage } from '../../pages/product-details/ui/Page.tsx';
import { CartPage } from '../../pages/cart/ui/Page.tsx';
import { MainLayout } from '../../shared/ui/layout/MainLayout.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <ProductsPage />,
            },
            {
                path: 'product/:productId',
                element: <ProductDetailsPage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
        ]
    },
]);
