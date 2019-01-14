export class BadgeDto {
    name: string;
    points: number;
    description: string;
    icon: string;
    pois: string[];
    constructor(n: string, points: number, d: string, i: string, pois: string[]) {
        this.name = n;
        this.points = points;
        this.description = d;
        this.icon = i;
        this.pois = pois;
    }
}
