package com.mario.myapplication.responses;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class UserEditResponse {
    private String id;
    private String name;
    private String picture;
    private List<String> badges = new ArrayList<>();
    private String role;
    private String email;
    private List<String> likes = new ArrayList<>();
    private List<String> favs = new ArrayList<>();
    private List<String> visited = new ArrayList<>();
    private String language;
    private List<String> friends = new ArrayList<>();
    private String createAt;
    private String updateAt;

    public UserEditResponse() {
    }

    public UserEditResponse(String id, String name, String picture, List<String> badges, String role, String email, List<String> likes, List<String> favs, List<String> visited, String language, List<String> friends, String createAt, String updateAt) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.badges = badges;
        this.role = role;
        this.email = email;
        this.likes = likes;
        this.favs = favs;
        this.visited = visited;
        this.language = language;
        this.friends = friends;
        this.createAt = createAt;
        this.updateAt = updateAt;
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

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public List<String> getBadges() {
        return badges;
    }

    public void setBadges(List<String> badges) {
        this.badges = badges;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public String getCreateAt() {
        return createAt;
    }

    public void setCreateAt(String createAt) {
        this.createAt = createAt;
    }

    public String getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(String updateAt) {
        this.updateAt = updateAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEditResponse that = (UserEditResponse) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(picture, that.picture) &&
                Objects.equals(badges, that.badges) &&
                Objects.equals(role, that.role) &&
                Objects.equals(email, that.email) &&
                Objects.equals(likes, that.likes) &&
                Objects.equals(favs, that.favs) &&
                Objects.equals(visited, that.visited) &&
                Objects.equals(language, that.language) &&
                Objects.equals(friends, that.friends) &&
                Objects.equals(createAt, that.createAt) &&
                Objects.equals(updateAt, that.updateAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, picture, badges, role, email, likes, favs, visited, language, friends, createAt, updateAt);
    }

    @Override
    public String toString() {
        return "UserEditResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", picture='" + picture + '\'' +
                ", badges=" + badges +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", likes=" + likes +
                ", favs=" + favs +
                ", visited=" + visited +
                ", language='" + language + '\'' +
                ", friends=" + friends +
                ", createAt='" + createAt + '\'' +
                ", updateAt='" + updateAt + '\'' +
                '}';
    }
}
