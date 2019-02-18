package com.mario.myapplication.responses;

import java.util.ArrayList;
import java.util.List;

public class PeopleResponse {

    private String _id;
    private String name;
    private String role;
    private String picture;
    private String password;
    private String email;
    private String createAt;
    private String city;
    private boolean friended;
    private LanguageResponse language;
    private List<String> favs = new ArrayList<>();
    private List<String> visited = new ArrayList<>();
    private List<BadgeResponse> badges = new ArrayList<>();
    private List<UserLikesResponse> likes  = new ArrayList<>();
    private List<String> friends = new ArrayList<>();


    public PeopleResponse() {

    }

    public PeopleResponse(String id, String name, String role, String picture, String password, String email, String createAt, String country, LanguageResponse language, List<String> favs, List<String> visited, List<BadgeResponse> badges, List<UserLikesResponse> likes, List<String> friends) {
        this._id = id;
        this.name = name;
        this.role = role;
        this.picture = picture;
        this.password = password;
        this.email = email;
        this.createAt = createAt;
        this.city = country;
        this.language = language;
        this.favs = favs;
        this.visited = visited;
        this.badges = badges;
        this.likes = likes;
        this.friends = friends;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public boolean isFriended() {
        return friended;
    }

    public void setFriended(boolean friended) {
        this.friended = friended;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public LanguageResponse getLanguage() {
        return language;
    }

    public void setLanguage(LanguageResponse language) {
        this.language = language;
    }

    public List<String> getFavs() {
        return favs;
    }

    public void setFavs(List<String> favs) {
        this.favs = favs;
    }

    public List<String> getVisited() {
        return visited;
    }

    public void setVisited(List<String> visited) {
        this.visited = visited;
    }

    public List<BadgeResponse> getBadges() {
        return badges;
    }

    public void setBadges(List<BadgeResponse> badges) {
        this.badges = badges;
    }

    public List<UserLikesResponse> getLikes() {
        return likes;
    }

    public void setLikes(List<UserLikesResponse> likes) {
        this.likes = likes;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    @Override
    public String toString() {
        return "PeopleResponse{" +
                "id='" + _id + '\'' +
                ", name='" + name + '\'' +
                ", role='" + role + '\'' +
                ", picture='" + picture + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", createAt='" + createAt + '\'' +
                ", country='" + city + '\'' +
                ", language=" + language +
                ", favs=" + favs +
                ", visited=" + visited +
                ", badges=" + badges +
                ", likes=" + likes +
                ", friends=" + friends +
                '}';
    }
}
