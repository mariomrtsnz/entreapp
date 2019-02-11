package com.mario.myapplication.ui.categories;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;

import com.mario.myapplication.R;
import com.mario.myapplication.model.Category;
import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.CategoryService;
import com.mario.myapplication.ui.categories.dummy.DummyContent;
import com.mario.myapplication.ui.categories.dummy.DummyContent.DummyItem;
import com.mario.myapplication.util.UtilToken;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link OnListFragmentInteractionListener}
 * interface.
 */
public class CategoryFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    Context ctx;
    MyCategoryRecyclerViewAdapter adapter;
    List<Category> categories;
    CategoryService service;


    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public CategoryFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static CategoryFragment newInstance(int columnCount) {
        CategoryFragment fragment = new CategoryFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String jwt = UtilToken.getToken(getContext());

        if (jwt == null) {
            // No hay token
            // ¿Qué haces en este activity?
            // Una de dos
            //      - O consigues otro token
            //      - O te vas a .... el formulario de Login
        }

        CategoryService service = ServiceGenerator.createService(CategoryService.class,
                jwt, AuthType.JWT);

        Call<ResponseContainer<CategoryResponse>> callList = service.listCategories();


        callList.enqueue(new Callback<ResponseContainer<CategoryResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<CategoryResponse>> call, Response<ResponseContainer<CategoryResponse>>
                    response) {
                if (response.isSuccessful()) {
                    //cargarDatos(response.body().getRows());
                } else {
                    // Toast
                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<CategoryResponse>> call, Throwable t) {
                // Toast
            }
        });

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_category_list, container, false);
        CategoryService service = null;
        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }


        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(CategoryResponse item);
    }

    private class LoadDataTask extends AsyncTask<String, Void, List<CategoryResponse>> {

        @Override
        protected List<CategoryResponse> doInBackground(String...Strings) {

            List<CategoryResponse> result = null;


            Call<ResponseContainer<CategoryResponse>> callCategory = service.listCategories();

            Response<ResponseContainer<CategoryResponse>> responseCategory = null;

            try {
                responseCategory = callCategory.execute();
            } catch (IOException e) {
                e.printStackTrace();
            }

            if (responseCategory.isSuccessful()) {
                result = (List<CategoryResponse>) responseCategory.body();
            }
            return result;
        }

        @Override
        protected void onPostExecute(List<CategoryResponse> repos) {
            if (repos != null) {
//                cargarDatos(repos);
            }
        }
    }
}
