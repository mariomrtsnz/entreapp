package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.model.Badge;
import com.mario.myapplication.responses.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface BadgeService {

    String BASE_URL = "/badges";

    @GET(BASE_URL)
    Call<ResponseContainer<Badge>> listBadges();

    @GET(BASE_URL + "/{id}")
    Call<Badge> getBadge(@Path("id") Long id);
}
