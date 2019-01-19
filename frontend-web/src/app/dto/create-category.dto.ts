import { Category } from '../interfaces/category';

export class CategoryCreateDto {

    name: string;
    parent: Category;


    constructor(name: string, parent: Category) {
        this.name = name;
        this.parent = parent;
    }
}
