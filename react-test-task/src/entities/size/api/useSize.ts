import {useQuery} from "@tanstack/react-query";
import {getSize} from '../../../shared/api/api'

export function useSize(sizeID: number) {
    return useQuery({
        queryKey: ['size', sizeID],
        queryFn: () =>
            getSize(sizeID),
        enabled: !!sizeID,
    })
}
