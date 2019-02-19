package com.mario.myapplication.ui.people;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.PeopleResponse;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.ui.login.LoginActivity;
import com.mario.myapplication.ui.people.details.PeopleDetailsFragment;
import com.mario.myapplication.util.UtilToken;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PeopleFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    Context ctx;
    List<PeopleResponse> users;
    UserService service;
    String jwt, idUser;
    ImageButton action;
    EditText name, id;
    ImageView picture;
    MyPeopleRecyclerViewAdapter adapter;
    FragmentManager f = getFragmentManager();
    private int mColumnCount = 1;
    private OnListFragmentUserInteractionListener mListener;


    public PeopleFragment() {
    }


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
        idUser = UtilToken.getId(getContext());
        if (jwt == null) {

            Intent i = new Intent(getActivity(), LoginActivity.class);
            startActivity(i);
        }


        UserService service = ServiceGenerator.createService(UserService.class,
                jwt, AuthType.JWT);

  /*      Call<ResponseContainer<UserResponse>> callList = service.listUsersAndFriended();

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
        }*/
    }

    public void loadItemsFragment (View view) {
        name = view.findViewById(R.id.user_name);
        action = view.findViewById(R.id.actionButton);
      //  id = view.findViewById(R.id.idUser);
        picture = view.findViewById(R.id.profilePic);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_people_list, container, false);
        loadItemsFragment(view);
        // Set the adapter
        if (view instanceof RecyclerView) {
            ctx = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }

            users = new ArrayList<>();
            UserService service = ServiceGenerator.createService(UserService.class, jwt, AuthType.JWT);
            Call<List<PeopleResponse>> callList = service.listUsersAndFriended();

            callList.enqueue(new Callback<List<PeopleResponse>>() {
                @Override
                public void onResponse(Call<List<PeopleResponse>> call, Response<List<PeopleResponse>> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                    } else {
                        users = response.body();
                        adapter = new MyPeopleRecyclerViewAdapter( getFragmentManager(), ctx, users, mListener);
                        recyclerView.setAdapter(adapter);


                    }
                }

                @Override
                public void onFailure(Call<List<PeopleResponse>> call, Throwable t) {
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

    public interface OnListFragmentUserInteractionListener {
        void onListFragmentUserInteraction(PeopleResponse item);
    }
}
