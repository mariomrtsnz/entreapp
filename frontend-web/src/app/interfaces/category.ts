import { Supercategory } from './supercategory';

export interface Category {
    id: number;
    name: String;
    supercategory: Supercategory;
}
