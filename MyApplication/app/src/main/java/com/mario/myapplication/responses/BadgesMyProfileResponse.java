package com.mario.myapplication.responses;

import java.util.Objects;

public class BadgesMyProfileResponse {
    private String id;
    private int points;

    public BadgesMyProfileResponse() {
    }

    public BadgesMyProfileResponse(String id, int points) {
        this.id = id;
        this.points = points;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BadgesMyProfileResponse that = (BadgesMyProfileResponse) o;
        return points == that.points &&
                Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, points);
    }

    @Override
    public String toString() {
        return "BadgesMyProfileResponse{" +
                "id='" + id + '\'' +
                ", points=" + points +
                '}';
    }
}
