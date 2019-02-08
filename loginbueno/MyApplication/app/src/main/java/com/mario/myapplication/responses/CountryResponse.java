package com.mario.myapplication.responses;

public class CountryResponse {

    private String name;

    public CountryResponse () {

    }

    public CountryResponse(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CountryResponse{" +
                "name='" + name + '\'' +
                '}';
    }
}
