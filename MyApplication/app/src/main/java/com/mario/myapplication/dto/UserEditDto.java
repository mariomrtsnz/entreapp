package com.mario.myapplication.dto;

import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.responses.UserResponse;

import java.util.ArrayList;
import java.util.List;

public class UserEditDto {

    private String email;
    private List<String> favs = new ArrayList<>();
    private List<String> friends = new ArrayList<>();
//    private String language;
    private List<String> likes = new ArrayList<>();
    private String name;


    public UserEditDto(){};


    public UserEditDto(String email, List<String> favs, List<String> friends, /*String language,*/ List<String> likes, String name) {
        this.email = email;
        this.favs = favs;
        this.friends = friends;
//        this.language = language;
        this.likes = likes;
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    /*public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }*/

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
