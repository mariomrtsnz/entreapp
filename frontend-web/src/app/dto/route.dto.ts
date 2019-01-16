export class RouteDto {
    name: string;
    pois: string[];
    constructor(n: string, p: string[]) {
        this.name = n;
        this.pois = p;
    }
}
