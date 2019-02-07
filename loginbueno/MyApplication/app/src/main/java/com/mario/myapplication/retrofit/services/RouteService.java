package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.model.Route;
import com.mario.myapplication.responses.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface RouteService {

    String BASE_URL = "/routes";

    @GET(BASE_URL)
    Call<ResponseContainer<Route>> listRoutes();

    @GET(BASE_URL + "/{id}")
    Call<Route> getBadge(@Path("id") Long id);
}
