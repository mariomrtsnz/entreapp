package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.User;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface UserService {
    @GET("/users")
    Call<ResponseContainer<User>> listUsers();

    @GET("/users/{id}")
    Call<User> getUser(@Path("id") Long id);
}
