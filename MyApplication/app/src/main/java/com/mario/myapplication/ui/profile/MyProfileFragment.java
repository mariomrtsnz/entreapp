package com.mario.myapplication.ui.profile;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.widget.NestedScrollView;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.bumptech.glide.Glide;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.MyProfileResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.util.UtilToken;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyProfileFragment extends Fragment {
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private static final int READ_REQUEST_CODE = 42;
    private Uri uriSelected;
    private String jwt;
    private Context ctx;
    private String userId;
    private UserService service;
    private MyProfileResponse myProfileResponse;
    private ImageView profile_image;
    private TextView textViewName;
    private TextView textViewPointsWritten;
    private TextView textViewLanguageWritten;
    private TextView textViewBadgesWritten;
    private TextView textViewEmailWritten;
    private TextView textViewPoisWritten;
    private TextView texViewCountryWritten;
    private TextView textViewFriendsWritten;
    private Button btn_edit;
    private UserViewModel mViewModel;


    private MyProfileInteractionListener mListener;

    public MyProfileFragment() {
    }

    public static MyProfileFragment newInstance(String param1, String param2) {
        MyProfileFragment fragment = new MyProfileFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ctx = getContext();
        jwt = UtilToken.getToken(ctx);
        userId = UtilToken.getId(ctx).toString();
        if (jwt == null) {
            //se manda al usuario al login
        }
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ctx = getContext();
        jwt = UtilToken.getToken(ctx);
        userId = UtilToken.getId(ctx).toString();
        View view = inflater.inflate(R.layout.fragment_my_profile, container, false);
        // every element is looked for
        loadItemsFragment(view);
        //callbacks
        getUser(view);

        return view;
    }





    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
       /* if (context instanceof MyProfileInteractionListener) {
            mListener = (MyProfileInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }*/
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }





    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(getActivity()).get(UserViewModel.class);

    }

    //own methods
    @SuppressLint("ResourceType")
    public void setItemsFragment(Response<MyProfileResponse> response, View v){
        String points="";
        myProfileResponse = response.body();
        //textViewEmailWritten.setText(myProfileResponse.getEmail());
        textViewEmailWritten.setText(myProfileResponse.getEmail());
        textViewName.setText(myProfileResponse.getName());
        if (myProfileResponse.getLanguage() != null) {
            textViewLanguageWritten.setText(myProfileResponse.getLanguage().getName());
        } else {
            textViewLanguageWritten.setText(R.string.no_language);
        }
        if (myProfileResponse.getCountry() != null) {
            texViewCountryWritten.setText(myProfileResponse.getCountry());
        } else {
            texViewCountryWritten.setText(R.string.no_country);
        }
        textViewPoisWritten.setText(String.valueOf(countPoisVisited(myProfileResponse)));
        textViewBadgesWritten.setText(String.valueOf(countBadges(myProfileResponse)));
        //points = res.getString(R.string.points) + " " + countPoints(myProfileResponse);
        points = String.valueOf(countPoints(myProfileResponse));
        textViewPointsWritten.setText(points);
        mViewModel.selectUser(myProfileResponse);

        //image
        Glide.with(ctx)
                .load(myProfileResponse.getPicture().toString())
                .into(profile_image);
        Log.d("LOL2", myProfileResponse.toString());

        //click events
        //edit user
        btn_edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(ctx, "EDITING USER!", Toast.LENGTH_LONG).show();

                getFragmentManager()
                        .beginTransaction()
                        .replace(R.id.contenedor, new MyProfileEditFragment())
                        .commit();
            }
        });
        //open my pictures
        profile_image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                performFileSearch();
            }
        });
        System.out.println(myProfileResponse.getLikes());



    }
    public void performFileSearch() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(intent, READ_REQUEST_CODE);
    }

    public int countPoints(MyProfileResponse u) {
        int points = 0;
        if (u.getBadges().size() >= 1) {
            for (int i = 0; i < u.getBadges().size(); i++) {
                points = points + u.getBadges().get(i).getPoints();
            }
        }
        return points;
    }

    public int countBadges(MyProfileResponse u) {
        int badges = 0;
        if (u.getBadges().size() >= 1) {
            for (int i = 0; i < u.getBadges().size(); i++) {
                badges++;
            }
        }
        return badges;
    }

    public int countPoisVisited(MyProfileResponse u) {
        return u.getVisited().size();
    }

    public void loadItemsFragment(View view) {
        textViewFriendsWritten = view.findViewById(R.id.textViewFriendsWritten);
        textViewBadgesWritten = view.findViewById(R.id.textViewBadgesWritten);
        textViewEmailWritten = view.findViewById(R.id.textViewEmailWritten);
        textViewLanguageWritten = view.findViewById(R.id.textViewLanguageWritten);
        textViewPoisWritten = view.findViewById(R.id.textViewPoisVisitedWritten);
        textViewName = view.findViewById(R.id.textViewName);
        textViewPointsWritten = view.findViewById(R.id.textViewPointsWritten);
        profile_image = view.findViewById(R.id.profile_image);
        texViewCountryWritten = view.findViewById(R.id.textViewCountryWritten);
        btn_edit = view.findViewById(R.id.btn_edit_profile);
        //btn_category=view.findViewById(R.id.buttonCategory);
        //layaoutLikes=view.findViewById(R.id.layoutLikes);
    }

    public void getUser(View view){
        service = ServiceGenerator.createService(UserService.class,
                jwt, AuthType.JWT);
        Call<MyProfileResponse> getOneUser = service.getUser(userId);
        getOneUser.enqueue(new Callback<MyProfileResponse>() {
            @Override
            public void onResponse(Call<MyProfileResponse> call, Response<MyProfileResponse> response) {
                //Resources res = getResources();
                String points = "";
                if (response.isSuccessful()) {
                    Log.d("LOL", "user obtain successfully");
                    setItemsFragment(response, view);
                } else {
                    Log.d("LOL3", "FALLITO BUENO");
                    Toast.makeText(ctx, "You have to log in!", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<MyProfileResponse> call, Throwable t) {
                Log.d("LOL4", "FALLITO BUENO");
                Toast.makeText(ctx, "Fail in the request!", Toast.LENGTH_LONG).show();
            }
        });
    }
}





