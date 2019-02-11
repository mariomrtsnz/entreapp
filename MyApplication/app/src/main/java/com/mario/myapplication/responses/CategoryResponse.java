package com.mario.myapplication.responses;

import com.mario.myapplication.model.Category;

public class CategoryResponse {

    private String id;
    private String name;
    private CategoryResponse parent;
    private boolean fav;

    public CategoryResponse() {

    }

    public CategoryResponse(String id, String name, CategoryResponse parent) {
        this.id = id;
        this.name = name;
        this.parent = parent;
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

    public CategoryResponse getParent() {
        return parent;
    }

    public void setParent(CategoryResponse parent) {
        this.parent = parent;
    }

    public boolean isFav() {
        return fav;
    }

    public void setFav(boolean fav) {
        this.fav = fav;
    }



}
