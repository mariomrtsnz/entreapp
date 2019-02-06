package eramus.visiton.mobile.app.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Poi;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface PoiService {

    String BASE_URL = "/pois";

    @GET(BASE_URL)
    Call<ResponseContainer<Poi>> listPois();

    @GET(BASE_URL + "/{id}")
    Call<Poi> getPoi(@Path("id") Long id);
}
