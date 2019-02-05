package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Badge;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface BadgeService {

    String BASE_URL = "/badges";

    @GET(BASE_URL)
    Call<ResponseContainer<Badge>> listBadges();

    @GET(BASE_URL + "/{id}")
    Call<Badge> getBadge(@Path("id") Long id);
}
