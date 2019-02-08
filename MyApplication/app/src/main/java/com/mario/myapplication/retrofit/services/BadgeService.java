package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.model.Badge;
import com.mario.myapplication.responses.BadgeResponse;
import com.mario.myapplication.responses.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface BadgeService {

    String BASE_URL = "/badges";

    @GET(BASE_URL)
    Call<ResponseContainer<BadgeResponse>> listBadges();

    @GET(BASE_URL + "/{id}")
    Call<BadgeResponse> getBadge(@Path("id") Long id);
}
