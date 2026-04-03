import {useQuery} from "@tanstack/react-query";
import {getProducts} from '../../../shared/api/api'
import type {Product} from "../model";

export function useProducts() {
    return useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: () =>
            getProducts() as Promise<Product[]>,
    })
}
