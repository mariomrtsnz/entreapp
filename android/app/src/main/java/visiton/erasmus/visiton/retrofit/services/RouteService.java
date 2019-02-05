package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Route;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface RouteService {

    String BASE_URL = "/routes";

    @GET(BASE_URL)
    Call<ResponseContainer<Route>> listRoutes();

    @GET(BASE_URL + "/{id}")
    Call<Route> getBadge(@Path("id") Long id);
}
