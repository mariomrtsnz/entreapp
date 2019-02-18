package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.responses.LanguageResponse;
import com.mario.myapplication.responses.LenguageResponseMyProfile;
import com.mario.myapplication.responses.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface LanguageService {

    String BASE_URL = "/languages";

    @GET(BASE_URL)
    Call<ResponseContainer<LanguageResponse>> listLanguages();

    @GET(BASE_URL + "/public")
    Call<ResponseContainer<LanguageResponse>> listLanguagesSignUp();

    @GET(BASE_URL + "/{id}")
    Call<LanguageResponse> getLanguage(@Path("id") Long id);
}
