package com.mario.myapplication.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class UserEditDto {
/*email, name, city, language, likes, favs, friends*/
    private String email;
    private String name;
    private String city;
    private String language;
    private List<String> likes = new ArrayList<>();
    private List<String> favs = new ArrayList<>();
    private List<String> friends = new ArrayList<>();



    public UserEditDto() {
    }

    ;

    public UserEditDto(String email, String name, String city, String language, List<String> likes, List<String> favs, List<String> friends) {
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
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

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEditDto that = (UserEditDto) o;
        return Objects.equals(email, that.email) &&
                Objects.equals(name, that.name) &&
                Objects.equals(city, that.city) &&
                Objects.equals(language, that.language) &&
                Objects.equals(likes, that.likes) &&
                Objects.equals(favs, that.favs) &&
                Objects.equals(friends, that.friends);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, name, city, language, likes, favs, friends);
    }

    @Override
    public String toString() {
        return "UserEditDto{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", language='" + language + '\'' +
                ", likes=" + likes +
                ", favs=" + favs +
                ", friends=" + friends +
                '}';
    }
}
