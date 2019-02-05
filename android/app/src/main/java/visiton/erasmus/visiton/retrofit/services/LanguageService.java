package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Language;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface LanguageService {

    @GET("/languages")
    Call<ResponseContainer<Language>> listLanguages();

    @GET("/languages/{id}")
    Call<Language> getLanguage(@Path("id") Long id);
}
