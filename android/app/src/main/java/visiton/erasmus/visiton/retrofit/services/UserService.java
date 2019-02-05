package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.User;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface UserService {
    @GET("/users")
    Call<ResponseContainer<User>> listUsers();

    @GET("/users/{id}")
    Call<User> getUser(@Path("id") Long id);

    @GET("/users/me")
    Call<User> getMe();

    @PUT("/users/{id}")
    Call<User> editUser(@Path("id") Long id, @Body User user);

    @PUT("/users/{id}/password")
    Call<User> editPassword(@Path("id") Long id, @Body String password);

    // It should be /me, must do in api first
//    @DELETE("/users/{id}")
//    Call<User> deleteUser(@Path("id") Long id);
}
