package com.mario.myapplication.model;

public class Category {

    private String id;
    private String name;
    private Category parent;
    private boolean fav;

    public Category() {

    }

    public Category(String id, String name, Category parent) {
        this.id = id;
        this.name = name;
        this.parent = parent;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getParent() {
        return parent;
    }

    public void setParent(Category parent) {
        this.parent = parent;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isFav() {
        return fav;
    }

    public void setFav(boolean fav) {
        this.fav = fav;
    }

    @Override
    public String toString() {
        return "Category{" +
                "name='" + name + '\'' +
                ", parent=" + parent +
                '}';
    }
}
