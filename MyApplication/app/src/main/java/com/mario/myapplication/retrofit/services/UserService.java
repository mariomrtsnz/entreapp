package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.model.User;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.responses.UserResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;


public interface UserService {

    String BASE_URL = "/users";

    @GET(BASE_URL)
    Call<ResponseContainer<UserResponse>> listUsers();

    @GET(BASE_URL+"/{id}")
    Call<UserResponse> getUser(@Path("id") String id);

    @GET(BASE_URL+"/me")
    Call<UserResponse> getMe();

    @PUT(BASE_URL+"/{id}")
    Call<UserResponse> editUser(@Path("id") String id, @Body UserResponse user);

    @PUT(BASE_URL+"/{id}/password")
    Call<UserResponse> editPassword(@Path("id") String id, @Body String password);

    // It should be /me, must do in api first
//    @DELETE("/users/{id}")
//    Call<User> deleteUser(@Path("id") Long id);
}
