package com.mario.myapplication.responses;

import com.mario.myapplication.model.Audioguide;
import com.mario.myapplication.model.Category;
import com.mario.myapplication.model.Description;

public class PoiResponse {

    private String id;
    private String name;
    private Category[] categories;
    private float[] coordinates;
    private String[] comments;
    private float stars;
    private String qrCode;
    private Audioguide audioguides;
    private Description descriptions;
    private String coverImage;
    private String[] images;
    private int year;
    private String creator;
    private String status;
    private String schedule;
    private float price;

    public PoiResponse() {}

    public PoiResponse(String id, String name, Category[] categories, float[] coordinates, String[] comments, float stars, String qrCode, Audioguide audioguides, Description descriptions, String coverImage, String[] images, int year, String status, String schedule) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.coordinates = coordinates;
        this.comments = comments;
        this.stars = stars;
        this.qrCode = qrCode;
        this.audioguides = audioguides;
        this.descriptions = descriptions;
        this.coverImage = coverImage;
        this.images = images;
        this.year = year;
        this.status = status;
        this.schedule = schedule;
    }

    public PoiResponse(String id, String name, Category[] categories, float[] coordinates, String[] comments, float stars, String qrCode, Audioguide audioguides, Description descriptions, String coverImage, String[] images, int year, String creator, String status, String schedule, float price) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.coordinates = coordinates;
        this.comments = comments;
        this.stars = stars;
        this.qrCode = qrCode;
        this.audioguides = audioguides;
        this.descriptions = descriptions;
        this.coverImage = coverImage;
        this.images = images;
        this.year = year;
        this.creator = creator;
        this.status = status;
        this.schedule = schedule;
        this.price = price;
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

    public Category[] getCategories() {
        return categories;
    }

    public void setCategories(Category[] categories) {
        this.categories = categories;
    }

    public float[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(float[] coordinates) {
        this.coordinates = coordinates;
    }

    public String[] getComments() {
        return comments;
    }

    public void setComments(String[] comments) {
        this.comments = comments;
    }

    public float getStars() {
        return stars;
    }

    public void setStars(float stars) {
        this.stars = stars;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public Audioguide getAudioguides() {
        return audioguides;
    }

    public void setAudioguides(Audioguide audioguides) {
        this.audioguides = audioguides;
    }

    public Description getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(Description descriptions) {
        this.descriptions = descriptions;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String[] getImages() {
        return images;
    }

    public void setImages(String[] images) {
        this.images = images;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
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
}
