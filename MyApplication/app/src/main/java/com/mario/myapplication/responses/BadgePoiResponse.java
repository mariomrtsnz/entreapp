package com.mario.myapplication.responses;

import com.mario.myapplication.model.Description;

public class BadgePoiResponse {
    private String id;
    private String name;
    private CoordinatesResponse loc;
    private float stars;
    private Description description;
    private String coverImage;
    private int year;
    private String status;
    private String schedule;
    private float price;

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

    public CoordinatesResponse getLoc() {
        return loc;
    }

    public void setLoc(CoordinatesResponse loc) {
        this.loc = loc;
    }

    public float getStars() {
        return stars;
    }

    public void setStars(float stars) {
        this.stars = stars;
    }

    public Description getDescription() {
        return description;
    }

    public void setDescription(Description description) {
        this.description = description;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "BadgePoiResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", loc=" + loc +
                ", stars=" + stars +
                ", description=" + description +
                ", coverImage='" + coverImage + '\'' +
                ", year=" + year +
                ", status='" + status + '\'' +
                ", schedule='" + schedule + '\'' +
                ", price=" + price +
                '}';
    }
}
