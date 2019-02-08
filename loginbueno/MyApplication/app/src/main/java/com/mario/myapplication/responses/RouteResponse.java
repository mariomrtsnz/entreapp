package com.mario.myapplication.responses;

import com.mario.myapplication.retrofit.services.RouteService;

public class RouteResponse {

    private String id;
    private String name;
    private PoiResponse[] pois;

    public RouteResponse() {}

    public RouteResponse(String id, String name, PoiResponse[] pois) {
        this.id = id;
        this.name = name;
        this.pois = pois;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PoiResponse[] getPois() {
        return pois;
    }

    public void setPois(PoiResponse[] pois) {
        this.pois = pois;
    }
}
