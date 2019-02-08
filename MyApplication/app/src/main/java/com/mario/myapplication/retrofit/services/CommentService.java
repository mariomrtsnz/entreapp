package com.mario.myapplication.retrofit.services;

import com.mario.myapplication.model.Comment;
import com.mario.myapplication.responses.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;


public interface CommentService {

    String BASE_URL = "/comments/";

    @GET(BASE_URL)
    Call<ResponseContainer<Comment>> listComments();

    @GET(BASE_URL + "/{id}")
    Call<Comment> getComment(@Path("id") Long id);

    @POST(BASE_URL)
    Call<Comment> createComment(@Body Comment c);

    @PUT(BASE_URL + "/{id}")
    Call<Comment> editComment(@Path("id") Long id, Comment c);

    @DELETE(BASE_URL + "/{id}")
    Call<Comment> deleteComment(@Path("id") Long id);
}
