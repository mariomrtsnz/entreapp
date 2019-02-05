package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Route;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface RouteService {

    @GET("/route")
    Call<ResponseContainer<Route>> listRoutes();

    @GET("/route/{id}")
    Call<Route> getBadge(@Path("id") Long id);
}
