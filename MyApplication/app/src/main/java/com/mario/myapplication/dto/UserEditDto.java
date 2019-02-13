package com.mario.myapplication.dto;

import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.responses.UserResponse;

import java.util.ArrayList;
import java.util.List;

public class UserEditDto {

    private String email;
    private String name;
    private String city;
    private Object language;
    private List<CategoryResponse> likes = new ArrayList<>();
    private List<PoiResponse> favs = new ArrayList<>();
    private List<UserResponse> friends = new ArrayList<>();

    public UserEditDto(){};

    public UserEditDto(String email, String name, String city, Object language, List<CategoryResponse> likes, List<PoiResponse> favs, List<UserResponse> friends) {
        this.email = email;
        this.name = name;
        this.city = city;
        this.language = language;
        this.likes = likes;
        this.favs = favs;
        this.friends = friends;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Object getLanguage() {
        return language;
    }

    public void setLanguage(Object language) {
        this.language = language;
    }

    public List<CategoryResponse> getLikes() {
        return likes;
    }

    public void setLikes(List<CategoryResponse> likes) {
        this.likes = likes;
    }

    public List<PoiResponse> getFavs() {
        return favs;
    }

    public void setFavs(List<PoiResponse> favs) {
        this.favs = favs;
    }

    public List<UserResponse> getFriends() {
        return friends;
    }

    public void setFriends(List<UserResponse> friends) {
        this.friends = friends;
    }
}
