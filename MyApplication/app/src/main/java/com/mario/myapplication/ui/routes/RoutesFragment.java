package com.mario.myapplication.ui.routes;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.responses.RouteResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.RouteService;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.util.UtilToken;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class RoutesFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    String jwt;
    RouteService service;
    UserService userService;
    List<RouteResponse> items;
    RoutesAdapter adapter;
    SwipeRefreshLayout swipeLayout;
    RecyclerView recycler;
    private Context ctx;
    private int mColumnCount = 1;
    private RouteListener mListener;

    public RoutesFragment() {
        // Required empty public constructor
    }


    public static RoutesFragment newInstance(int columnCount) {
        RoutesFragment fragment = new RoutesFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    public void listRoutes(String userId) {
        RouteService service = ServiceGenerator.createService(RouteService.class, jwt, AuthType.JWT);
        Call<ResponseContainer<RouteResponse>> call = service.listRoutes();
        call.enqueue(new Callback<ResponseContainer<RouteResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<RouteResponse>> call, Response<ResponseContainer<RouteResponse>> response) {
                if (response.code() != 200) {
                    Toast.makeText(getActivity(), "Request Error", Toast.LENGTH_SHORT).show();
                } else {
                    items = response.body().getRows();
                    adapter = new RoutesAdapter(ctx, items, mListener);
                    recycler.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<RouteResponse>> call, Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(getActivity(), "Network Error", Toast.LENGTH_SHORT).show();
            }
        });

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        if (getArguments() != null) {
//            mParam1 = getArguments().getString(ARG_PARAM1);
//            mParam2 = getArguments().getString(ARG_PARAM2);
//        }

        if(getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View layout = inflater.inflate(R.layout.fragment_routes, container, false);

        if (layout instanceof SwipeRefreshLayout) {
            ctx = layout.getContext();
            recycler = layout.findViewById(R.id.routes_list);
            if (mColumnCount <= 1) {
                recycler.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recycler.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            items = new ArrayList<>();
            listRoutes(UtilToken.getId(ctx));
            adapter = new RoutesAdapter(ctx, items, mListener);
            recycler.setAdapter(adapter);

            swipeLayout = layout.findViewById(R.id.routesSwipeContainer);
            swipeLayout.setColorSchemeColors(ContextCompat.getColor(getContext(), R.color.colorPrimary), ContextCompat.getColor(getContext(), R.color.colorAccent));
            swipeLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
                @Override
                public void onRefresh() {
                    listRoutes(UtilToken.getId(ctx));
                    if (swipeLayout.isRefreshing()) {
                        swipeLayout.setRefreshing(false);
                    }
                }
            });
        }
        return layout;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof RouteListener) {
            mListener = (RouteListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement RouteListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }
}
