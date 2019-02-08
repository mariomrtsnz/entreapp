package com.mario.myapplication.model;

public class Translation {

    private String id;
    private String translatedFile;

    public Translation() {

    }

    public Translation(String id, String translatedFile) {
        this.id = id;
        this.translatedFile = translatedFile;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTranslatedFile() {
        return translatedFile;
    }

    public void setTranslatedFile(String translatedFile) {
        this.translatedFile = translatedFile;
    }
}
