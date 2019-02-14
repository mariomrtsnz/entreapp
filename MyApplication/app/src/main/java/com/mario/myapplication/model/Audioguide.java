package com.mario.myapplication.model;

public class Audioguide {

    private Language language;
    private String originalFile;
    private Translation[] translations;

    public Audioguide() {
    }

    public Audioguide(Language language, String originalFile, Translation[] translations) {
        this.language = language;
        this.originalFile = originalFile;
        this.translations = translations;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getOriginalFile() {
        return originalFile;
    }

    public void setOriginalFile(String originalFile) {
        this.originalFile = originalFile;
    }

    public Translation[] getTranslations() {
        return translations;
    }

    public void setTranslations(Translation[] translations) {
        this.translations = translations;
    }
}
