package com.mario.myapplication.model;

import java.util.Arrays;

public class Route {

    private String name;
    private Poi pois[];

    public Route() {

    }

    public Route(String name, Poi[] pois) {
        this.name = name;
        this.pois = pois;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Poi[] getPois() {
        return pois;
    }

    public void setPois(Poi[] pois) {
        this.pois = pois;
    }

    @Override
    public String toString() {
        return "Route{" +
                "name='" + name + '\'' +
                ", pois=" + Arrays.toString(pois) +
                '}';
    }
}
