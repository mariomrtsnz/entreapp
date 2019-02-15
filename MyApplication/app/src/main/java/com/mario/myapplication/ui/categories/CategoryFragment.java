package com.mario.myapplication.ui.categories;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.CategoryService;
import com.mario.myapplication.ui.login.LoginActivity;
import com.mario.myapplication.util.UtilToken;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link }
 * interface.
 */
public class CategoryFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    Context ctx;
    MyCategoryRecyclerViewAdapter adapter;
    List<CategoryResponse> categories;
    CategoryService service;
    String jwt;
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentCategoryInteractionListener mListener;

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

        jwt = UtilToken.getToken(getContext());

        if (jwt == null) {
            Intent i = new Intent(getActivity(), LoginActivity.class);
            startActivity(i);
        }

        CategoryService service = ServiceGenerator.createService(CategoryService.class,
                jwt, AuthType.JWT);

        Call<ResponseContainer<CategoryResponse>> callList = service.listCategories();


        callList.enqueue(new Callback<ResponseContainer<CategoryResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<CategoryResponse>> call, Response<ResponseContainer<CategoryResponse>>
                    response) {
                if (response.isSuccessful()) {
                    Log.d("flama", "vas flama");
                } else {
                    Toast.makeText(ctx, "You have to log in!", Toast.LENGTH_LONG).show();
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

        if (view instanceof RecyclerView) {
            ctx = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            categories = new ArrayList<>();

            CategoryService service = ServiceGenerator.createService(CategoryService.class, jwt, AuthType.JWT);
            Call<ResponseContainer<CategoryResponse>> call = service.listCategories();

            call.enqueue(new Callback<ResponseContainer<CategoryResponse>>() {
                @Override
                public void onResponse(Call<ResponseContainer<CategoryResponse>> call, Response<ResponseContainer<CategoryResponse>> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                    } else {
                        categories = response.body().getRows();

                        adapter = new MyCategoryRecyclerViewAdapter(ctx, categories, mListener);
                        recyclerView.setAdapter(adapter);

                    }
                }

                @Override
                public void onFailure(Call<ResponseContainer<CategoryResponse>> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
                }
            });

        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentCategoryInteractionListener) {
            mListener = (OnListFragmentCategoryInteractionListener) context;
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


    public interface OnListFragmentCategoryInteractionListener {
        void onListFragmentCategoryInteraction(CategoryResponse item);
    }

}


