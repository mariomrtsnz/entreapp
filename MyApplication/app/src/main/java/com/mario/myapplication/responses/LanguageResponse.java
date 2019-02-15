package com.mario.myapplication.responses;

import java.util.Objects;

public class LanguageResponse {

    private String id;
    private String name;
    private String isoCode;

    public LanguageResponse(){

    }

    public LanguageResponse(String id, String name, String isoCode) {
        this.id = id;
        this.name = name;
        this.isoCode = isoCode;
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

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    @Override
    public String toString() {
        return name;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LanguageResponse)) return false;
        LanguageResponse that = (LanguageResponse) o;
        return Objects.equals(getName(), that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }
}
