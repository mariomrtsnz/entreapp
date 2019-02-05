package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Language;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface LanguageService {

    String BASE_URL = "/languages";

    @GET(BASE_URL)
    Call<ResponseContainer<Language>> listLanguages();

    @GET(BASE_URL + "/{id}")
    Call<Language> getLanguage(@Path("id") Long id);
}
