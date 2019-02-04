package visiton.erasmus.visiton.model;

import java.util.Arrays;

public class Badge {
    private String name;
    private float points;
    private String description;
    private String icon;
    private Poi pois[];

    public Badge() {

    }

    public Badge(String name, float points, String description, String icon, Poi[] pois) {
        this.name = name;
        this.points = points;
        this.description = description;
        this.icon = icon;
        this.pois = pois;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPoints() {
        return points;
    }

    public void setPoints(float points) {
        this.points = points;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Poi[] getPois() {
        return pois;
    }

    public void setPois(Poi[] pois) {
        this.pois = pois;
    }

    @Override
    public String toString() {
        return "Badge{" +
                "name='" + name + '\'' +
                ", points=" + points +
                ", description='" + description + '\'' +
                ", icon='" + icon + '\'' +
                ", pois=" + Arrays.toString(pois) +
                '}';
    }
}
