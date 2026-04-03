import type {Color} from '../../color/model'

export type {Color}

export type Product = {
    id: number,
    name: string,
    categoryId: number,
    brand: string,
    colors: Array<Color>
}
