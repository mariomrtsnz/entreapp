package com.mario.myapplication.ui.badges.detail;

import android.content.Context;
import android.graphics.drawable.PictureDrawable;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestBuilder;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.BadgeResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.BadgeService;
import com.mario.myapplication.ui.badges.BadgeListener;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link BadgeDetailFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link BadgeDetailFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class BadgeDetailFragment extends Fragment {
    private String badgeId, jwt;
    private BadgeResponse badge;
    private TextView name, description, points;
    private ImageView earned, icon;
    private BadgeDetailListener mListener;
    private Context ctx;
    private RequestBuilder<PictureDrawable> requestBuilder;

    public BadgeDetailFragment() {
        // Required empty public constructor
    }

    public BadgeDetailFragment(String badgeId) {
        this.badgeId = badgeId;
    }

    private void getBadgeDetails(String badgeId, View layout) {
        BadgeService service = ServiceGenerator.createService(BadgeService.class, jwt, AuthType.JWT);
        Call<BadgeResponse> call = service.getBadge(badgeId);
        call.enqueue(new Callback<BadgeResponse>() {
            @Override
            public void onResponse(Call<BadgeResponse> call, Response<BadgeResponse> response) {
                if (response.code() != 200) {
                    Toast.makeText(getActivity(), "Request Error", Toast.LENGTH_SHORT).show();
                } else {
                    System.out.println(response.body());
                    badge = response.body();
                    setData(layout);
                }
            }

            @Override
            public void onFailure(Call<BadgeResponse> call, Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(getActivity(), "Network Error", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    public static BadgeDetailFragment newInstance(String param1, String param2) {
        BadgeDetailFragment fragment = new BadgeDetailFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        if (getArguments() != null) {
//            mParam1 = getArguments().getString(ARG_PARAM1);
//            mParam2 = getArguments().getString(ARG_PARAM2);
//        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View layout = inflater.inflate(R.layout.fragment_badge_detail, container, false);
        ctx = layout.getContext();
        getBadgeDetails(badgeId, layout);
        return layout;
    }

    private void setData(View layout) {
        name = layout.findViewById(R.id.badge_detail_name);
        description = layout.findViewById(R.id.badge_detail_description);
        points = layout.findViewById(R.id.badge_detail_points);
        icon = layout.findViewById(R.id.badge_detail_icon);
        earned = layout.findViewById(R.id.badge_detail_earned);
        name.setText(badge.getName());
        description.setText(badge.getDescription());
        points.setText(String.valueOf(badge.getPoints()));
        Glide.with(ctx).load(badge.getIcon()).into(icon);
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
//            mListener.onBadgeClick();
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof BadgeListener) {
            mListener = (BadgeDetailListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement BadgeDetailListener");
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
