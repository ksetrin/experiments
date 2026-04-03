import {useQuery} from "@tanstack/react-query";
import {getProductColor} from '../../../shared/api/api'

export function useProductColor(productID: number, colorID: number) {
    return useQuery({
        queryKey: ['product', productID, 'color', colorID],
        queryFn: () =>
            getProductColor(productID, colorID),
        enabled: !!colorID && !!productID,
    })
}
