package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.responses.ResponseContainer;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface PoiService {

    String BASE_URL = "/pois";

    @GET(BASE_URL)
    Call<ResponseContainer<PoiResponse>> listPois();

    @GET(BASE_URL)
    Call<ResponseContainer<PoiResponse>> listPois(@Query("near") String latlng, @Query("maxDistance") int maxDistance);

    @GET(BASE_URL + "/{id}")
    Call<PoiResponse> getPoi(@Path("id") String id);
}
