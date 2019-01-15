export class RouteDto {
    pois: string[];
    name: string;
    constructor(p: string[], n: string) {
        this.pois = p;
        this.name = n;
    }
}
