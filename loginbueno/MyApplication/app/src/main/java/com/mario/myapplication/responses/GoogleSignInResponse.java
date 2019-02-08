package com.mario.myapplication.responses;

public class GoogleSignInResponse {
    private String accessToken;

    public GoogleSignInResponse() {

    }

    public GoogleSignInResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "GoogleSignInResponse{" +
                "accessToken='" + accessToken + '\'' +
                '}';
    }
}
