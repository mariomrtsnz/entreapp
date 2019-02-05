package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Poi;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface PoiService {

    @GET("/pois")
    Call<ResponseContainer<Poi>> listPois();

    @GET("/pois/{id}")
    Call<Poi> getPoi(@Path("id") Long id);
}
