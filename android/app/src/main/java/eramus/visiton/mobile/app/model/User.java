package eramus.visiton.mobile.app.model;

import java.util.Arrays;

public class User {

    private String email;
    private String password;
    private String name;
    private String services[];
    private String role;
    private String picture;
    private Category likes;
    private Poi visited;
    private Poi badges;
    private String city;
    private Language language;
    private User friends[];

    public User() {

    }

    public User(String email, String password, String name, String[] services, String role, String picture, Category likes, Poi visited, Poi badges, String city, Language language, User[] friends) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.services = services;
        this.role = role;
        this.picture = picture;
        this.likes = likes;
        this.visited = visited;
        this.badges = badges;
        this.city = city;
        this.language = language;
        this.friends = friends;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getServices() {
        return services;
    }

    public void setServices(String[] services) {
        this.services = services;
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

    public Category getLikes() {
        return likes;
    }

    public void setLikes(Category likes) {
        this.likes = likes;
    }

    public Poi getVisited() {
        return visited;
    }

    public void setVisited(Poi visited) {
        this.visited = visited;
    }

    public Poi getBadges() {
        return badges;
    }

    public void setBadges(Poi badges) {
        this.badges = badges;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public User[] getFriends() {
        return friends;
    }

    public void setFriends(User[] friends) {
        this.friends = friends;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", services=" + Arrays.toString(services) +
                ", role='" + role + '\'' +
                ", picture='" + picture + '\'' +
                ", likes=" + likes +
                ", visited=" + visited +
                ", badges=" + badges +
                ", city='" + city + '\'' +
                ", language=" + language +
                ", friends=" + Arrays.toString(friends) +
                '}';
    }
}
