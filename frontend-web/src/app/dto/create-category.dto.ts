import { Category } from '../interfaces/category';

export class CategoryCreateDto {

    name: string;
    parent: string;


    constructor(name: string, parent: string) {
        this.name = name;
        this.parent = parent;
    }
}
