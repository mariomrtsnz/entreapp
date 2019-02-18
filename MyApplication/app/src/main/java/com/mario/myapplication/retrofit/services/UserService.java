package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.dto.UserEditDto;
import com.mario.myapplication.responses.MyProfileResponse;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.responses.UserEditResponse;
import com.mario.myapplication.responses.UserResponse;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;


public interface UserService {

    String BASE_URL = "/users";

    @GET(BASE_URL)
    Call<ResponseContainer<UserResponse>> listUsers();

    /**
     * Call that invokes the whole list of users, but with an additional field which contains
     * a boolean attribute about if every single user is a friend of us or not
     * @param id The logged user's id
     * @return The list of users
     */

    @GET(BASE_URL + "/friended/{id}")
    Call<ResponseContainer<UserResponse>> listUsersAndFriended(@Path("id") String id);

    @GET(BASE_URL + "/{id}")
    Call<MyProfileResponse> getUser(@Path("id") String id);

    @GET(BASE_URL + "/{id}")
    Call<UserResponse> getUserResponse(@Path("id") String id);

    @GET(BASE_URL + "/me")
    Call<UserResponse> getMe();

    @PUT(BASE_URL + "/{id}")
    Call<UserEditResponse> editUser(@Path("id") String id, @Body UserEditDto user);

    @PUT(BASE_URL + "/{id}/password")
    Call<UserResponse> editPassword(@Path("id") String id, @Body String password);

    // It should be /me, must do in api first
//    @DELETE("/users/{id}")
//    Call<User> deleteUser(@Path("id") Long id);
    @Multipart
    @POST("/users/uploadProfilePicture")
    Call<MyProfileResponse> uploadPictureProfile(@Part MultipartBody.Part avatar,
                                   @Part("id") RequestBody id);


}
