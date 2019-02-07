package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.model.Poi;
import com.mario.myapplication.responses.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface PoiService {

    String BASE_URL = "/pois";

    @GET(BASE_URL)
    Call<ResponseContainer<Poi>> listPois();

    @GET(BASE_URL + "/{id}")
    Call<Poi> getPoi(@Path("id") Long id);
}
