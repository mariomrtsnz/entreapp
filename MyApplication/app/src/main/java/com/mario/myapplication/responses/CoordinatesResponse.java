package com.mario.myapplication.responses;

import java.util.Arrays;
import java.util.Objects;

public class CoordinatesResponse {
    private float coordinates[];
    private float dist;

    public CoordinatesResponse(float[] coordinates, float dist) {
        this.coordinates = coordinates;
        this.dist = dist;
    }

    public float[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(float[] coordinates) {
        this.coordinates = coordinates;
    }

    public float getDist() {
        return dist;
    }

    public void setDist(float dist) {
        this.dist = dist;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CoordinatesResponse that = (CoordinatesResponse) o;
        return Float.compare(that.dist, dist) == 0 &&
                Arrays.equals(coordinates, that.coordinates);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(dist);
        result = 31 * result + Arrays.hashCode(coordinates);
        return result;
    }

    @Override
    public String toString() {
        return "CoordinatesResponse{" +
                "coordinates=" + Arrays.toString(coordinates) +
                ", dist=" + dist +
                '}';
    }
}
