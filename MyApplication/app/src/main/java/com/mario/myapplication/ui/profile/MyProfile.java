package com.mario.myapplication.ui.profile;

import android.content.Context;
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

import com.mario.myapplication.R;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.util.UtilToken;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyProfile extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    String jwt;
    Context ctx;
    String userId;
    UserService service;
    UserResponse userResponse;
    ImageView profile_image;
    TextView textViewName;
    TextView textViewPoints;
    TextView textViewLanguageWritten;
    TextView textViewBadgesWritten;
    TextView textViewEmailWritten;
    TextView textViewPoisWritten;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private MyProfileInteractionListener mListener;

    public MyProfile() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment MyProfile.
     */
    // TODO: Rename and change types and number of parameters
    public static MyProfile newInstance(String param1, String param2) {
        MyProfile fragment = new MyProfile();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ctx= getContext();
        jwt = UtilToken.getToken(ctx);
        userId = UtilToken.getId(ctx);
        if (jwt == null) {

            // No hay token
            // ¿Qué haces en este activity?
            // Una de dos
            //      - O consigues otro token
            //      - O te vas a .... el formulario de Login
        }
        service = ServiceGenerator.createService(UserService.class,
                jwt, AuthType.JWT);
        Call<UserResponse> getOneUser = service.getUser(userId);
        getOneUser.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    Log.d("LOL", "user obtain successfully");
                    userResponse=response.body();

                    Log.d("LOL2", userResponse.toString());

                } else {
                    Log.d("LOL3", "FALLITO BUENO");

                    Toast.makeText(ctx, "You have to log in!", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Log.d("LOL4", "FALLITO BUENO");

                Toast.makeText(ctx, "Fail in the request!", Toast.LENGTH_LONG).show();


            }
        });

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_my_profile, container, false);
        // every element is looked for
        loadItemsFragment(view);

        // every element is set
       /* textViewEmailWritten.setText(userResponse.getEmail());
        textViewName.setText(userResponse.getName());
        textViewLanguageWritten.setText(userResponse.getLanguage());*/

        //textViewName.setText(userResponse.getName());
        return view;
    }
    public void loadItemsFragment(View view) {
        textViewBadgesWritten = view.findViewById(R.id.textViewBadgesWritten);
        textViewEmailWritten = view.findViewById(R.id.textViewEmailWritten);
        textViewLanguageWritten = view.findViewById(R.id.textViewLanguageWritten);
        textViewPoisWritten = view.findViewById(R.id.textViewPoisVisitedWritten);
        textViewName = view.findViewById(R.id.textViewName);
        textViewPoints = view.findViewById(R.id.textViewPoints);

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
        if (context instanceof MyProfileInteractionListener) {
            mListener = (MyProfileInteractionListener) context;
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

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }

}
