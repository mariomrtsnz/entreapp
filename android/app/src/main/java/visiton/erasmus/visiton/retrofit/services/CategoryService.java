package visiton.erasmus.visiton.retrofit.services;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import visiton.erasmus.visiton.model.Category;
import visiton.erasmus.visiton.responses.ResponseContainer;

public interface CategoryService {

    String BASE_URL = "/categories";

    @GET(BASE_URL)
    Call<ResponseContainer<Category>> listCategories();

    @GET(BASE_URL + "/{id}")
    Call<Category> getCategory(@Path("id") Long id);
}
