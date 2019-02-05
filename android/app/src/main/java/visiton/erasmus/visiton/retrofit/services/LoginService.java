package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;
import visiton.erasmus.visiton.responses.LoginResponse;
import visiton.erasmus.visiton.responses.Register;

public interface LoginService {

    @POST("/auth")
    Call<LoginResponse> doLogin(@Header("Authorization") String authorization);


    @POST("/users")
    Call<LoginResponse> doRegister(@Body Register register);




}

