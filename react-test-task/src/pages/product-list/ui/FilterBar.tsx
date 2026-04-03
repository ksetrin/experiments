import type { FC } from 'react';

interface FilterBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    inStockOnly: boolean;
    onInStockChange: (value: boolean) => void;
    sort: 'asc' | 'desc' | '';
    onSortChange: (value: 'asc' | 'desc' | '') => void;
    totalCount: number;
}

export const FilterBar: FC<FilterBarProps> = ({
    search,
    onSearchChange,
    inStockOnly,
    onInStockChange,
    sort,
    onSortChange,
    totalCount
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 pb-8">
            <div className="space-y-4 w-full md:w-auto">
                <h1 className="text-sm uppercase tracking-widest text-gray-400">
                    Каталог / {totalCount} позиций
                </h1>
                <input
                    type="text"
                    placeholder="ПОИСК ПО НАЗВАНИЮ..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full md:w-80 border-2 border-gray-900 px-4 py-2 text-sm focus:bg-gray-50 outline-none uppercase font-bold"
                />
            </div>

            <div className="flex flex-wrap gap-6 items-center w-full md:w-auto">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => onInStockChange(e.target.checked)}
                        className="w-4 h-4 accent-gray-900"
                    />
                    <span className="text-xs font-bold uppercase tracking-tighter group-hover:underline">В наличии</span>
                </label>

                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc' | '')}
                    className="border-2 border-gray-900 px-3 py-2 text-xs font-bold uppercase outline-none bg-white cursor-pointer"
                >
                    <option value="">Сортировка</option>
                    <option value="asc">Цена: По возрастанию</option>
                    <option value="desc">Цена: По убыванию</option>
                </select>
            </div>
        </div>
    );
};
