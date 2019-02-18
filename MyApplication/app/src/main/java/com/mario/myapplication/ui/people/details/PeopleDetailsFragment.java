package com.mario.myapplication.ui.people.details;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.MyProfileResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.ui.login.LoginActivity;
import com.mario.myapplication.util.UtilToken;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link PeopleDetailsFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link PeopleDetailsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PeopleDetailsFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    Uri uriSelected;
    final String idChosen;
    String jwt;
    Context ctx;
    String userId;
    UserService service;
    MyProfileResponse myProfileResponse;
    ImageView profile_image;
    TextView textViewName;
    TextView textViewPointsWritten;
    TextView textViewLanguageWritten;
    TextView textViewBadgesWritten;
    TextView textViewEmailWritten;
    TextView textViewPoisWritten;
    TextView texViewCountryWritten;

    private PeopleViewModel mViewModel;
    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

    public PeopleDetailsFragment(String id) {
        this.idChosen = id;
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     */
    // TODO: Rename and change types and number of parameters
    public static PeopleDetailsFragment newInstance(String id) {
        PeopleDetailsFragment fragment = new PeopleDetailsFragment(id);
        Bundle args = new Bundle();

        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ctx = getContext();
        jwt = UtilToken.getToken(ctx);
        userId = UtilToken.getId(ctx);
        if (jwt == null) {
            Intent i = new Intent(getActivity(), LoginActivity.class);
            startActivity(i);

        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_people_details, container, false);
        ctx = getContext();
        jwt = UtilToken.getToken(ctx);
        System.out.println(idChosen);
        loadItemsFragment(view);

        service = ServiceGenerator.createService(UserService.class,
                jwt, AuthType.JWT);
        Call<MyProfileResponse> getOneUser = service.getUser(idChosen);
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

        return view;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @SuppressLint("ResourceType")
    public void setItemsFragment(Response<MyProfileResponse> response, View v) {
        String points = "";
        myProfileResponse = response.body();
        //textViewEmailWritten.setText(myProfileResponse.getEmail());
        textViewEmailWritten.setText(myProfileResponse.getEmail());
        textViewName.setText(myProfileResponse.getName());
        if (myProfileResponse.getLanguage() != null) {
            textViewLanguageWritten.setText(myProfileResponse.getLanguage().getName());
        } else {
            textViewLanguageWritten.setText(R.string.no_language);
        }
        if (myProfileResponse.getcity() != null) {
            texViewCountryWritten.setText(myProfileResponse.getcity());
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
    }

    public void loadItemsFragment(View view) {
        textViewBadgesWritten = view.findViewById(R.id.textViewBadgesWritten_details);
        textViewEmailWritten = view.findViewById(R.id.textViewEmailWritten_details);
        textViewLanguageWritten = view.findViewById(R.id.textViewLanguageWritten_details);
        textViewPoisWritten = view.findViewById(R.id.textViewPoisVisitedWritten_details);
        textViewName = view.findViewById(R.id.textViewName_details);
        textViewPointsWritten = view.findViewById(R.id.textViewPointsWritten_details);
        profile_image = view.findViewById(R.id.edit_profile_image);
        texViewCountryWritten = view.findViewById(R.id.textViewCountryWritten_details);

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
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
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
}
