package com.mario.myapplication.responses;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MyProfileResponse {
    private String id;
    private String name;
    private String role;
    private String picture;
    private String password;
    private String email;
    private String createAt;
    private String country;
    private LanguageResponse language;
    private List<PoiResponse> visited = new ArrayList<>();
    private List<BadgeResponse> badges = new ArrayList<>();
    private List<CategoryResponse> likes  = new ArrayList<>();

    public MyProfileResponse() {
    }

    public MyProfileResponse(String id, String name, String role, String picture, String password, String email, String createAt, String country, LanguageResponse language, List<PoiResponse> visited, List<BadgeResponse> badges, List<CategoryResponse> likes) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.picture = picture;
        this.password = password;
        this.email = email;
        this.createAt = createAt;
        this.country = country;
        this.language = language;
        this.visited = visited;
        this.badges = badges;
        this.likes = likes;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCreateAt() {
        return createAt;
    }

    public void setCreateAt(String createAt) {
        this.createAt = createAt;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LanguageResponse getLanguage() {
        return language;
    }

    public void setLanguage(LanguageResponse language) {
        this.language = language;
    }

    public List<PoiResponse> getVisited() {
        return visited;
    }

    public void setVisited(List<PoiResponse> visited) {
        this.visited = visited;
    }

    public List<BadgeResponse> getBadges() {
        return badges;
    }

    public void setBadges(List<BadgeResponse> badges) {
        this.badges = badges;
    }

    public List<CategoryResponse> getLikes() {
        return likes;
    }

    public void setLikes(List<CategoryResponse> likes) {
        this.likes = likes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MyProfileResponse that = (MyProfileResponse) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(role, that.role) &&
                Objects.equals(picture, that.picture) &&
                Objects.equals(password, that.password) &&
                Objects.equals(email, that.email) &&
                Objects.equals(createAt, that.createAt) &&
                Objects.equals(country, that.country);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, role, picture, password, email, createAt, country);
    }
}
