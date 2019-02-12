package com.mario.myapplication.ui.people;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.ui.people.dummy.DummyContent;
import com.mario.myapplication.ui.people.dummy.DummyContent.DummyItem;
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
public class PeopleFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentUserInteractionListener mListener;
    Context ctx = getContext();
    List<UserResponse> users;
    UserService service;
    String jwt;
    MyPeopleRecyclerViewAdapter adapter;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public PeopleFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static PeopleFragment newInstance(int columnCount) {
        PeopleFragment fragment = new PeopleFragment();
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
            // No hay token
            // ¿Qué haces en este activity?
            // Una de dos
            //      - O consigues otro token
            //      - O te vas a .... el formulario de Login
        }

        UserService service = ServiceGenerator.createService(UserService.class,
                jwt, AuthType.JWT);

        Call<ResponseContainer<UserResponse>> callList = service.listUsers();

        callList.enqueue(new Callback<ResponseContainer<UserResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<UserResponse>> call, Response<ResponseContainer<UserResponse>> response) {
                if (response.isSuccessful()) {
                    Log.d("flama", "vas flama");
                } else {
                    Toast.makeText(ctx, "You have to log in!", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<UserResponse>> call, Throwable t) {
//                Toast.makeText(ctx, "TokenFailure", Toast.LENGTH_LONG).show();
            }
        });

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_people_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }

            users = new ArrayList<>();
            UserService service = ServiceGenerator.createService(UserService.class, jwt, AuthType.JWT);
            Call<ResponseContainer<UserResponse>> callList = service.listUsers();

            callList.enqueue(new Callback<ResponseContainer<UserResponse>>() {
                @Override
                public void onResponse(Call<ResponseContainer<UserResponse>> call, Response<ResponseContainer<UserResponse>> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                    } else {
                        users = response.body().getRows();
                        adapter = new MyPeopleRecyclerViewAdapter(ctx, users, mListener);
                        recyclerView.setAdapter(adapter);
                    }
                }

                @Override
                public void onFailure(Call<ResponseContainer<UserResponse>> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(getActivity(), "Network Failure", Toast.LENGTH_SHORT).show();
                }
            });

        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentUserInteractionListener) {
            mListener = (OnListFragmentUserInteractionListener) context;
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
    public interface OnListFragmentUserInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentUserInteraction(UserResponse item);
    }
}
