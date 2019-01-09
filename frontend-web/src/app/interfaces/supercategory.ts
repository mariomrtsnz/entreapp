import { Category } from './category';

export interface Supercategory {
    id: number;
    name: String;
    categories: Category[];
}
