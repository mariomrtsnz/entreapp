package eramus.visiton.mobile.app.model;

import java.util.Arrays;

public class Poi {

    private String name;
    private Category categories[];
    private double coordinates[];
    private String qrCode;
    private String audioguides;
    private String description;
    private String coverImage;
    private String images;
    private int year;
    private String creator;
    private String status;
    private String schedule;
    private double price;

    public Poi() {

    }

    public Poi(String name, Category[] categories, double[] coordinates, String qrCode, String audioguides, String description, String coverImage, String images, int year, String creator, String status, String schedule, double price) {
        this.name = name;
        this.categories = categories;
        this.coordinates = coordinates;
        this.qrCode = qrCode;
        this.audioguides = audioguides;
        this.description = description;
        this.coverImage = coverImage;
        this.images = images;
        this.year = year;
        this.creator = creator;
        this.status = status;
        this.schedule = schedule;
        this.price = price;
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

    public double[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(double[] coordinates) {
        this.coordinates = coordinates;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public String getAudioguides() {
        return audioguides;
    }

    public void setAudioguides(String audioguides) {
        this.audioguides = audioguides;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Poi{" +
                "name='" + name + '\'' +
                ", categories=" + Arrays.toString(categories) +
                ", coordinates=" + Arrays.toString(coordinates) +
                ", qrCode='" + qrCode + '\'' +
                ", audioguides='" + audioguides + '\'' +
                ", description='" + description + '\'' +
                ", coverImage='" + coverImage + '\'' +
                ", images='" + images + '\'' +
                ", year=" + year +
                ", creator='" + creator + '\'' +
                ", status='" + status + '\'' +
                ", schedule='" + schedule + '\'' +
                ", price=" + price +
                '}';
    }


}
