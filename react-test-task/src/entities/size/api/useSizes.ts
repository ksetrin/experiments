import {useQuery} from "@tanstack/react-query";
import {getSizes} from '../../../shared/api/api'

export function useSizes() {
    return useQuery({
        queryKey: ['sizes'],
        queryFn: () =>
            getSizes(),
    })
}
