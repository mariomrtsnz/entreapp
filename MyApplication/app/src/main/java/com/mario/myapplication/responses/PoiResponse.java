package com.mario.myapplication.responses;

import com.mario.myapplication.model.Audioguide;
import com.mario.myapplication.model.Category;
import com.mario.myapplication.model.Description;

public class PoiResponse {

    private String id;
    private String name;
    private Category[] categories;
    private CoordinatesResponse loc;
    private String[] comments;
    private float stars;
    private String qrCode;
    private Audioguide audioguides;
    private Description description;
    private String coverImage;
    private String[] images;
    private int year;
    private String creator;
    private String status;
    private String schedule;
    private float price;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Category[] getCategories() {
        return categories;
    }

    public CoordinatesResponse getLoc() {
        return loc;
    }

    public String[] getComments() {
        return comments;
    }

    public float getStars() {
        return stars;
    }

    public String getQrCode() {
        return qrCode;
    }

    public Audioguide getAudioguides() {
        return audioguides;
    }

    public Description getDescription() {
        return description;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public String[] getImages() {
        return images;
    }

    public int getYear() {
        return year;
    }

    public String getCreator() {
        return creator;
    }

    public String getStatus() {
        return status;
    }

    public String getSchedule() {
        return schedule;
    }

    public float getPrice() {
        return price;
    }
}
