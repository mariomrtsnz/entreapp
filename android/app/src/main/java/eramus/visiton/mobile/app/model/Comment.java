package eramus.visiton.mobile.app.model;

import java.util.Arrays;

public class Comment {
    private User user;
    private float rating;
    private String content;
    private Poi poi;
    private String photos[];

    public Comment() {

    }

    public Comment(User user, float rating, String content, Poi poi, String[] photos) {
        this.user = user;
        this.rating = rating;
        this.content = content;
        this.poi = poi;
        this.photos = photos;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Poi getPoi() {
        return poi;
    }

    public void setPoi(Poi poi) {
        this.poi = poi;
    }

    public String[] getPhotos() {
        return photos;
    }

    public void setPhotos(String[] photos) {
        this.photos = photos;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "user=" + user +
                ", rating=" + rating +
                ", content='" + content + '\'' +
                ", poi=" + poi +
                ", photos=" + Arrays.toString(photos) +
                '}';
    }

}
