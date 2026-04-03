import {useQuery} from "@tanstack/react-query";
import {getProduct} from '../../../shared/api/api'

export function useProduct(productID: number) {
    return useQuery({
        queryKey: ['product', productID],
        queryFn: () =>
            getProduct(productID),
        enabled: !!productID,
    })
}
