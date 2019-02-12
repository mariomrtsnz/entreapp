package com.mario.myapplication.ui.pois.list;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.PoiService;
import com.mario.myapplication.util.UtilToken;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PoiListFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    private String jwt;
    private List<PoiResponse> items;
    private PoiListAdapter adapter;
    private PoiListListener mListener;
    private Context ctx;
    private int mColumnCount = 1;

    public PoiListFragment() { }

    /*
    public static PoiListFragment newInstance(int columnCount) {
        PoiListFragment fragment = new PoiListFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }
    */

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        jwt = UtilToken.getToken(Objects.requireNonNull(getContext()));

        PoiService service = ServiceGenerator.createService(PoiService.class, jwt, AuthType.JWT);
        Call<ResponseContainer<PoiResponse>> callList = service.listPois();
        callList.enqueue(new Callback<ResponseContainer<PoiResponse>>() {
            @Override
            public void onResponse(@NonNull Call<ResponseContainer<PoiResponse>> call, @NonNull Response<ResponseContainer<PoiResponse>> response) {
                if (!response.isSuccessful()) {
                    Toast.makeText(ctx, "You have to log in!", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(@NonNull Call<ResponseContainer<PoiResponse>> call, @NonNull Throwable t) {

            }
        });
        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View layout = inflater.inflate(R.layout.fragment_poi_list, container, false);
        if (layout instanceof RecyclerView) {
            ctx = layout.getContext();
            RecyclerView recycler = layout.findViewById(R.id.pois_list);
            if (mColumnCount <= 1) {
                recycler.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recycler.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            items = new ArrayList<>();
            PoiService service = ServiceGenerator.createService(PoiService.class, jwt, AuthType.JWT);
            Call<ResponseContainer<PoiResponse>> call = service.listPois();
            call.enqueue(new Callback<ResponseContainer<PoiResponse>>() {
                @Override
                public void onResponse(@NonNull Call<ResponseContainer<PoiResponse>> call, @NonNull Response<ResponseContainer<PoiResponse>> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Request Error", Toast.LENGTH_SHORT).show();
                    } else {
                        items = Objects.requireNonNull(response.body()).getRows();
                        adapter = new PoiListAdapter(ctx, items);
                        recycler.setAdapter(adapter);
                    }
                }

                @Override
                public void onFailure(@NonNull Call<ResponseContainer<PoiResponse>> call, @NonNull Throwable t) {
                    Log.e("Network Failure", t.getMessage());
                    Toast.makeText(getActivity(), "Network Error", Toast.LENGTH_SHORT).show();
                }
            });
        }
        return layout;
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof PoiListListener) {
            mListener = (PoiListListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement PoiListListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }
}
