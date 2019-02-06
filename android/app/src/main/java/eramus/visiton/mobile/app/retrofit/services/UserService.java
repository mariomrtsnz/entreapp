package eramus.visiton.mobile.app.retrofit.services;

import eramus.visiton.mobile.app.model.User;
import eramus.visiton.mobile.app.responses.ResponseContainer;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;


public interface UserService {

    String BASE_URL = "/users";

    @GET(BASE_URL)
    Call<ResponseContainer<User>> listUsers();

    @GET(BASE_URL+"/{id}")
    Call<User> getUser(@Path("id") Long id);

    @GET(BASE_URL+"/me")
    Call<User> getMe();

    @PUT(BASE_URL+"/{id}")
    Call<User> editUser(@Path("id") Long id, @Body User user);

    @PUT(BASE_URL+"/{id}/password")
    Call<User> editPassword(@Path("id") Long id, @Body String password);

    // It should be /me, must do in api first
//    @DELETE("/users/{id}")
//    Call<User> deleteUser(@Path("id") Long id);
}
