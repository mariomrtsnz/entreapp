package com.mario.myapplication.retrofit.services;

import com.google.android.gms.maps.model.LatLng;
import com.mario.myapplication.model.Poi;
import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.responses.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface PoiService {

    String BASE_URL = "/pois";

    @GET(BASE_URL)
    Call<ResponseContainer<PoiResponse>> listPois();

    @GET(BASE_URL)
    Call<ResponseContainer<PoiResponse>> getNearestPois(@Query("near") String latlng, @Query("min_distance") int minDistance, @Query("max_distance") int maxDistance);

    @GET(BASE_URL + "/{id}")
    Call<PoiResponse> getPoi(@Path("id") String id);
}
