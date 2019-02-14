package com.mario.myapplication.ui.profile;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
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
    Uri uriSelected;
    String jwt;
    Context ctx;
    String userId;
    UserService service;
    MyProfileResponse myProfileResponse;
    ImageView profile_image;
    TextView textViewName;
    TextView textViewPoints;
    TextView textViewLanguageWritten;
    TextView textViewBadgesWritten;
    TextView textViewEmailWritten;
    TextView textViewPoisWritten;
    TextView texViewCountryWritten;
    Button btn_edit;
    private UserViewModel mViewModel;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
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
        service = ServiceGenerator.createService(UserService.class,
                jwt, AuthType.JWT);
        Call<MyProfileResponse> getOneUser = service.getUser(userId);
        getOneUser.enqueue(new Callback<MyProfileResponse>() {
            @Override
            public void onResponse(Call<MyProfileResponse> call, Response<MyProfileResponse> response) {
                Resources res = getResources();
                String points = "";
                if (response.isSuccessful()) {
                    Log.d("LOL", "user obtain successfully");
                    myProfileResponse = response.body();
                    textViewEmailWritten.setText(myProfileResponse.getEmail());
                    textViewName.setText(myProfileResponse.getName());
                    if (myProfileResponse.getLanguage() != null) {
                        textViewLanguageWritten.setText(myProfileResponse.getLanguage().getName());
                    } else {
                        textViewLanguageWritten.setText(R.string.defaultLanguage);
                    }
                    if (myProfileResponse.getCountry() != null) {
                        texViewCountryWritten.setText(myProfileResponse.getCountry());
                    } else {
                        texViewCountryWritten.setText(R.string.no_country);
                    }
                    textViewPoisWritten.setText(String.valueOf(countPoisVisited(myProfileResponse)));
                    textViewBadgesWritten.setText(String.valueOf(countBadges(myProfileResponse)));
                    points = res.getString(R.string.points) + " " + countPoints(myProfileResponse);
                    textViewPoints.setText(points);
                    mViewModel.selectUser(myProfileResponse);

                    //image
                    Glide.with(ctx)
                            .load(myProfileResponse.getPicture().toString())
                            .into(profile_image);
                    Log.d("LOL2", myProfileResponse.toString());
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
        profile_image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                performFileSearch();
            }
        });
        return view;
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
        textViewBadgesWritten = view.findViewById(R.id.textViewBadgesWritten);
        textViewEmailWritten = view.findViewById(R.id.textViewEmailWritten);
        textViewLanguageWritten = view.findViewById(R.id.textViewLanguageWritten);
        textViewPoisWritten = view.findViewById(R.id.textViewPoisVisitedWritten);
        textViewName = view.findViewById(R.id.textViewName);
        textViewPoints = view.findViewById(R.id.textViewPoints);
        profile_image = view.findViewById(R.id.profile_image);
        texViewCountryWritten = view.findViewById(R.id.textViewCountryWritten);
        btn_edit = view.findViewById(R.id.btn_edit_profile);
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.clickOnCamera();
        }
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

    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(getActivity()).get(UserViewModel.class);

    }
}





