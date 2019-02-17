package com.mario.myapplication.responses;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MyProfileResponse {
    /*Necesito del lenguage el name y el id
     * de friends los id
     * de pois favs los id
     * de pois visited los ids
     * de badges los id y los points
     *de category como likes el id y el name
     *
     * Pasos:
     * cambiar modelo de my profile response
     *
     * Cambiar la peticionen el fragmento de my profile
     * setear los campos siguiendo la NUEVA estructura de my profile response
     *
     * setear los campos siguiendo la NUEVA estructura de my profile response en edit fragment */
    private String id;
    private String name;
    private String role;
    private String picture;
    private String password;
    private String email;

    private String createAt;
    private String city;
    private LenguageResponseMyProfile language;
    private List<String> favs = new ArrayList<>();
    private List<String> friends = new ArrayList<>();
    private List<String> visited = new ArrayList<>();
    private List<BadgesMyProfileResponse> badges = new ArrayList<>();
    private List<CategoryMyProfileResponse> likes  = new ArrayList<>();

    public MyProfileResponse() {
    }

    public MyProfileResponse(String id, String name, String role, String picture, String password, String email, String createAt, String city, LenguageResponseMyProfile language, List<String> favs, List<String> friends, List<String> visited, List<BadgesMyProfileResponse> badges, List<CategoryMyProfileResponse> likes) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.picture = picture;
        this.password = password;
        this.email = email;
        this.createAt = createAt;
        this.city = city;
        this.language = language;
        this.favs = favs;
        this.friends = friends;
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

    public String getcity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public LenguageResponseMyProfile getLanguage() {
        return language;
    }

    public void setLanguage(LenguageResponseMyProfile language) {
        this.language = language;
    }

    public List<String> getFavs() {
        return favs;
    }

    public void setFavs(List<String> favs) {
        this.favs = favs;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public List<String> getVisited() {
        return visited;
    }

    public void setVisited(List<String> visited) {
        this.visited = visited;
    }

    public List<BadgesMyProfileResponse> getBadges() {
        return badges;
    }

    public void setBadges(List<BadgesMyProfileResponse> badges) {
        this.badges = badges;
    }

    public List<CategoryMyProfileResponse> getLikes() {
        return likes;
    }

    public void setLikes(List<CategoryMyProfileResponse> likes) {
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
                Objects.equals(city, that.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, role, picture, password, email, createAt, city);
    }

    @Override
    public String toString() {
        return "MyProfileResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", role='" + role + '\'' +
                ", picture='" + picture + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", createAt='" + createAt + '\'' +
                ", city='" + city + '\'' +
                ", language=" + language +
                ", favs=" + favs +
                ", friends=" + friends +
                ", visited=" + visited +
                ", badges=" + badges +
                ", likes=" + likes +
                '}';
    }
}
