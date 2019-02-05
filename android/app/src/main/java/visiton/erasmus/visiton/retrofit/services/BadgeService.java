package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Badge;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface BadgeService {

    @GET("/badges")
    Call<ResponseContainer<Badge>> listBadges();

    @GET("/badges/{id}")
    Call<Badge> getBadge(@Path("id") Long id);
}
