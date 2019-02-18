package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.responses.BadgeResponse;
import com.mario.myapplication.responses.ResponseContainer;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface BadgeService {

    String BASE_URL = "/badges";

    @GET(BASE_URL)
    Call<ResponseContainer<BadgeResponse>> listBadges();

    @GET(BASE_URL + "/{id}")
    Call<BadgeResponse> getBadge(@Path("id") String id);

    @GET(BASE_URL + "/earned")
    Call<List<BadgeResponse>> listBadgesAndEarned();

    @GET(BASE_URL + "/earned")
    Call<List<BadgeResponse>> listBadgesAndEarned(@Query("sort") String points);
}
