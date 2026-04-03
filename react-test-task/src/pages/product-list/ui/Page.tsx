import { useState, useMemo } from 'react';
import { useProducts } from '../../../entities/product/api/useProducts';
import { FilterBar } from './FilterBar';
import { ProductCard } from './ProductCard';

export function ProductsPage() {
    const { data: products, isLoading, isError } = useProducts();
    const [search, setSearch] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sort, setSort] = useState<'asc' | 'desc' | ''>('');

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products
            .filter((p) => {
                const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
                const isInStock = !inStockOnly || p.colors.some((c) => c.sizes.length > 0);
                return matchesSearch && isInStock;
            })
            .sort((a, b) => {
                if (!sort) return 0;
                const priceA = Math.min(...a.colors.map((c) => Number(c.price)));
                const priceB = Math.min(...b.colors.map((c) => Number(c.price)));
                return sort === 'asc' ? priceA - priceB : priceB - priceA;
            });
    }, [products, search, inStockOnly, sort]);

    if (isLoading) return <div className="p-10 font-mono">Загрузка товаров...</div>;
    if (isError) return <div className="p-10 text-red-600 font-mono">Ошибка при загрузке данных</div>;

    return (
        <main className="p-8 space-y-8">
            <FilterBar
                search={search}
                onSearchChange={setSearch}
                inStockOnly={inStockOnly}
                onInStockChange={setInStockOnly}
                sort={sort}
                onSortChange={setSort}
                totalCount={filteredProducts.length}
            />

            {filteredProducts.length === 0 ? (
                <div className="p-20 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 uppercase font-bold tracking-widest">Товары не найдены</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}
