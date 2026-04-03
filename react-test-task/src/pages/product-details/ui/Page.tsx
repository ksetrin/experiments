import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useProduct } from '../../../entities/product/api/useProduct';
import { useSizes } from "../../../entities/size/api/useSizes.ts";
import { useCartStore } from "../../../entities/cart/model/store.ts";
import type { Size } from "../../../entities/size/model";
import { ImageGallery } from './ImageGallery';
import { ProductInfo } from './ProductInfo';
import { VariantSelector } from './VariantSelector';

export function ProductDetailsPage() {
    const { productId } = useParams<{ productId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeIdx, setActiveIdx] = useState(0);

    const id = Number(productId);
    const { data: product, isLoading } = useProduct(id);
    const { data: allSizes } = useSizes();

    const urlColorId = Number(searchParams.get('color'));
    const urlSizeId = Number(searchParams.get('size'));

    const currentColor = product?.colors.find(c => c.id === urlColorId) || product?.colors[0];

    const availableSizes = (allSizes as Size[] | undefined)?.filter(s =>
        currentColor?.sizes.includes(s.id)
    ) || [];

    const selectedSizeId = availableSizes.some(s => s.id === urlSizeId) ? urlSizeId : null;

    const handleColorChange = (colorId: number) => {
        searchParams.set('color', String(colorId));
        searchParams.delete('size');
        setSearchParams(searchParams);
        setActiveIdx(0);
    };

    const handleSizeChange = (sizeId: number) => {
        searchParams.set('size', String(sizeId));
        setSearchParams(searchParams);
    };

    const addItem = useCartStore(state => state.addItem);

    const handleAddToCart = () => {
        if (!selectedSizeId || !currentColor || !product) return;

        addItem({
            productId: id,
            colorId: currentColor.id,
            sizeId: selectedSizeId,
            price: Number(currentColor.price),
            name: product.name,
            colorName: currentColor.name,
            sizeName: availableSizes.find(s => s.id === selectedSizeId)?.name || '',
            imageUrl: currentColor.images[0],
        });
    };

    if (isLoading) return <div className="p-10 font-mono">Загрузка данных...</div>;
    if (!product || !currentColor) return (
        <div className="p-20 text-center space-y-5">
            <h1 className="text-2xl font-bold uppercase tracking-tighter">Товар не найден</h1>
            <Link to="/" className="inline-block border-2 border-gray-900 px-6 py-2 font-bold hover:bg-gray-100 uppercase">
                ← Назад к списку
            </Link>
        </div>
    );

    return (
        <main className="p-8 max-w-6xl mx-auto space-y-12">
            <div className="border-b border-gray-100 pb-4">
                <Link to="/" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
                    ← КАТАЛОГ / {product.name}
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <ImageGallery 
                    images={currentColor.images} 
                    activeIndex={activeIdx} 
                    onIndexChange={setActiveIdx} 
                />

                <div className="space-y-12">
                    <ProductInfo 
                        name={product.name}
                        brand={product.brand}
                        price={currentColor.price}
                        description={currentColor.description}
                    />

                    <VariantSelector 
                        product={product}
                        currentColor={currentColor}
                        availableSizes={availableSizes}
                        selectedSizeId={selectedSizeId}
                        onColorChange={handleColorChange}
                        onSizeChange={handleSizeChange}
                        onAddToCart={handleAddToCart}
                    />
                </div>
            </div>
        </main>
    );
}
