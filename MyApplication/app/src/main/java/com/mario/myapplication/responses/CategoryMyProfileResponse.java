package com.mario.myapplication.responses;

import java.util.Objects;

public class CategoryMyProfileResponse {
    private String id;
    private String name;

    public CategoryMyProfileResponse() {
    }

    public CategoryMyProfileResponse(String id, String name) {
        this.id = id;
        this.name = name;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryMyProfileResponse that = (CategoryMyProfileResponse) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "CategoryMyProfileResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
