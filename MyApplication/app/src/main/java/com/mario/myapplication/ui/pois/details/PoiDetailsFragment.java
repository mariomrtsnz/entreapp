package com.mario.myapplication.ui.pois.details;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.CustomViewTarget;
import com.bumptech.glide.request.transition.Transition;
import com.google.android.material.chip.Chip;
import com.google.android.material.chip.ChipDrawable;
import com.google.android.material.chip.ChipGroup;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.mario.myapplication.R;
import com.mario.myapplication.model.Category;
import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.PoiService;
import com.mario.myapplication.ui.people.MyPeopleRecyclerViewAdapter;
import com.mario.myapplication.util.UtilToken;

import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class PoiDetailsFragment extends Fragment {

    private final String id;
    private PoiResponse poi;

    public PoiDetailsFragment(String poiId) {
        id = poiId;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getPoiDetails();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_poi_details, container, false);

       /* FloatingActionButton fab = v.findViewById(R.id.btn_poi_audioguide);
        fab.setOnClickListener(view -> Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                .setAction("Action", null).show());*/

        return v;
    }

    private void getPoiDetails() {
        String jwt = UtilToken.getToken(Objects.requireNonNull(getContext()));
        PoiService service = ServiceGenerator.createService(PoiService.class, jwt, AuthType.JWT);
        Call<PoiResponse> call = service.getPoi(id);

        call.enqueue(new Callback<PoiResponse>() {
            @Override
            public void onResponse(@NonNull Call<PoiResponse> call, @NonNull Response<PoiResponse> response) {
                if (response.code() != 200) {
                    Toast.makeText(getActivity(), "Request Error", Toast.LENGTH_SHORT).show();
                } else {
                    poi = response.body();
                    setDataOnView();
                }
            }

            @Override
            public void onFailure(@NonNull Call<PoiResponse> call, @NonNull Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(getActivity(), "Network Error", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void setDataOnView() {
        View v = getView();
        ((TextView) Objects.requireNonNull(v).findViewById(R.id.tv_poi_name)).setText(Html.fromHtml(poi.getName()));
        ((TextView) Objects.requireNonNull(v).findViewById(R.id.tv_poi_description)).setText(Html.fromHtml(poi.getDescription().getOriginalDescription()));
        Glide.with(this).load(poi.getCoverImage()).into((ImageView) v.findViewById(R.id.iv_poi_image));

        ChipGroup cg = Objects.requireNonNull(v).findViewById(R.id.cg_categories);
        for (Category c: poi.getCategories()) {
            Chip cc = new Chip(Objects.requireNonNull(getContext()));
            cc.setChipDrawable(ChipDrawable.createFromResource(Objects.requireNonNull(getContext()), R.xml.chip_categories));
            cc.setText(c.getName());

            cg.addView(cc);

        }
    }

}
