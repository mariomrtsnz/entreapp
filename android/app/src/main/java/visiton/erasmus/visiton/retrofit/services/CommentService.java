package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Comment;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface CommentService {

    @GET("/comments")
    Call<ResponseContainer<Comment>> listComments();

    @GET("/comments/{id}")
    Call<Comment> getComment(@Path("id") Long id);

    @POST("/comments")
    Call<Comment> createComment(@Body Comment c);

    @PUT("/comment/{id}")
    Call<Comment> editComment(@Path("id") Long id, Comment c);

    @DELETE("/comments/{id}")
    Call<Comment> deleteComment(@Path("id") Long id);
}
