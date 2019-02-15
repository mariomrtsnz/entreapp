package com.mario.myapplication.ui.profile;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.mario.myapplication.dto.UserEditDto;
import com.mario.myapplication.model.Language;
import com.mario.myapplication.responses.CategoryMyProfileResponse;
import com.mario.myapplication.responses.LanguageResponse;
import com.mario.myapplication.responses.ResponseContainer;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.MyProfileResponse;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.LanguageService;
import com.mario.myapplication.util.UtilToken;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyProfileEditFragment extends Fragment {

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private UserViewModel mViewModel;
    private EditText editTextName,  editTextcountry, editTextemail;
    private Spinner spinnerLanguages;
    private MyProfileResponse updatedUser;
    private MyProfileInteractionListener mListener;
    LanguageService service;
    private Context ctx;
    private String jwt;
    private String userId;
    private Button btn_save;
    List<LanguageResponse> languages;

    public MyProfileEditFragment() {
    }

    public static MyProfileEditFragment newInstance(String param1, String param2) {
        MyProfileEditFragment fragment = new MyProfileEditFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        ctx = getContext();
        jwt = UtilToken.getToken(ctx);
        userId = UtilToken.getId(ctx).toString();
        View v= inflater.inflate(R.layout.fragment_my_profile_edit, container, false);
        loadItemsFragment(v);
        setItemsFragment(updatedUser);
        return v;
    }




    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        /*if (context instanceof MyProfileInteractionListener) {
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

    public void onCreate(Bundle savedInstanceState) {
        // Create a ViewModel the first time the system calls an activity's onCreate() method.
        // Re-created activities receive the same MyViewModel instance created by the first activity.

        super.onCreate(savedInstanceState);

        mViewModel = ViewModelProviders.of(getActivity()).get(UserViewModel.class);
        mViewModel.getSelectedUser().observe(getActivity(),
                user -> {
                updatedUser = user;

                //setItemsFragment(user);
                });
    }
    public void loadAllLanguages(){
        service = ServiceGenerator.createService(LanguageService.class,
                jwt, AuthType.JWT);
        Call<ResponseContainer<LanguageResponse>> getAllLanguages = service.listLanguages();
        getAllLanguages.enqueue(new Callback<ResponseContainer<LanguageResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<LanguageResponse>> call, Response<ResponseContainer<LanguageResponse>> response) {
                if (response.isSuccessful()) {
                    Log.d("successLanguage", "languageObtained");
                    languages = response.body().getRows();
                    System.out.println(languages);

                    ArrayAdapter<LanguageResponse> adapter =
                            new ArrayAdapter<LanguageResponse>(ctx, android.R.layout.simple_spinner_dropdown_item, languages);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinnerLanguages.setAdapter(adapter);

                } else {
                    Toast.makeText(ctx, "You have to log in!", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<LanguageResponse>> call, Throwable t) {
                Log.d("onFailure", "Fail in the request");
                Toast.makeText(ctx, "Fail in the request!", Toast.LENGTH_LONG).show();
            }
        });
    }
    //own methods
    public void loadItemsFragment(View view) {
        spinnerLanguages = view.findViewById(R.id.spinnerLanguage);
        editTextcountry=view.findViewById(R.id.editTextCountry);
        editTextemail=view.findViewById(R.id.editTextEmail);
        editTextName=view.findViewById(R.id.editTextName);
        btn_save =view.findViewById(R.id.btn_edit_profile);
    }
    public void setItemsFragment(MyProfileResponse user){
        btn_save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                myProfileResponseToUserEditDto(user);

            }
        });
        editTextName.setText(user.getName());
        editTextemail.setText(user.getEmail());
        if (user.getCountry()!=null){
            editTextcountry.setText(user.getCountry());
        }else{
            editTextcountry.setText(R.string.no_country);
        }
        loadAllLanguages();

    }
    public UserEditDto myProfileResponseToUserEditDto(MyProfileResponse user){
        UserEditDto userEditDto = new UserEditDto();
        List<String> likes = new ArrayList<>();
        userEditDto.setName(user.getName());
        userEditDto.setLanguage(user.getLanguage().getId());
        userEditDto.setEmail(user.getEmail());
        userEditDto.setFavs(user.getFavs());
        userEditDto.setFriends(user.getFriends());
        //iterations
        for (CategoryMyProfileResponse c:user.getLikes()){
        likes.add(c.getId());
        }
        userEditDto.setLikes(likes);


        return userEditDto;
    }
}

