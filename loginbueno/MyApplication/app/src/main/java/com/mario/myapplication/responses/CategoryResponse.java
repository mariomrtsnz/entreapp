package com.mario.myapplication.responses;

import com.mario.myapplication.model.Category;

public class CategoryResponse {

    private String id;
    private String name;
    private Category category;


    public CategoryResponse() {

    }

    public CategoryResponse(String id, String name, Category category) {
        this.id = id;
        this.name = name;
        this.category = category;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "CategoryResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", category=" + category +
                '}';
    }

}
