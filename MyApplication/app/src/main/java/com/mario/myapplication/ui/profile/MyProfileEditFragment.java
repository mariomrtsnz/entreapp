package com.mario.myapplication.ui.profile;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Spinner;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.MyProfileResponse;

public class MyProfileEditFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private UserViewModel mViewModel;
    private EditText editTextName,  editTextcountry, editTextemail;
    private Spinner spinnerLanguages;
    private MyProfileResponse updatedUser;
    private MyProfileInteractionListener mListener;
    public MyProfileEditFragment() {
        // Required empty public constructor
    }
    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment MyProfileEdit.
     */
    // TODO: Rename and change types and number of parameters
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
        View v= inflater.inflate(R.layout.fragment_my_profile_edit, container, false);
        loadItemsFragment(v);
        return v;
    }
    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            //mListener.onFragmentInteraction(uri);
        }
    }
    public void loadItemsFragment(View view) {
        spinnerLanguages = view.findViewById(R.id.spinnerLanguage);
        editTextcountry=view.findViewById(R.id.editTextCountry);
        editTextemail=view.findViewById(R.id.editTextEmail);
        editTextName=view.findViewById(R.id.editTextName);
    }
    public void setItemsFragment(MyProfileResponse user){

        editTextName.setText(user.getName());
        editTextemail.setText(user.getEmail());
        editTextcountry.setText(user.getCountry());
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
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
    public void onCreate(Bundle savedInstanceState) {
        // Create a ViewModel the first time the system calls an activity's onCreate() method.
        // Re-created activities receive the same MyViewModel instance created by the first activity.

        super.onCreate(savedInstanceState);

        mViewModel = ViewModelProviders.of(getActivity()).get(UserViewModel.class);
        mViewModel.getSelectedUser().observe(getActivity(),
                user -> {
                updatedUser = user;
                setItemsFragment(user);
                });
    }
}

