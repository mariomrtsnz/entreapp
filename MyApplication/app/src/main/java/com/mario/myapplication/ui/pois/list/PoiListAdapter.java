package com.mario.myapplication.ui.pois.list;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.util.UtilToken;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PoiListAdapter extends RecyclerView.Adapter<PoiListAdapter.ViewHolder> {

    private final PoiListListener mListener;
    private List<PoiResponse> data;
    private Context context;
    // private RequestBuilder<PictureDrawable> requestBuilder;


    PoiListAdapter(Context ctx, List<PoiResponse> data, PoiListListener mListener) {
        this.data = data;
        this.context = ctx;
        this.mListener = mListener;
    }

    @NonNull
    @Override
    public PoiListAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.poi_list_custom_item, viewGroup, false);
        // requestBuilder = Glide.with(context).as(PictureDrawable.class).listener(new SvgSoftwareLayerSetter<>());
        return new PoiListAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final PoiListAdapter.ViewHolder viewHolder, int i) {
        String jwt = UtilToken.getToken(context);
        // private final PoiListListener mListener;
        UserService service = ServiceGenerator.createService(UserService.class, jwt, AuthType.JWT);
        Call<UserResponse> call = service.getUserResponse(UtilToken.getId(context));
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(@NonNull Call<UserResponse> call, @NonNull Response<UserResponse> response) {
                if (!response.isSuccessful()) {
                    Toast.makeText(context, "You have to be logged in", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(@NonNull Call<UserResponse> call, @NonNull Throwable t) {
                Toast.makeText(context, "You have to be logged in", Toast.LENGTH_SHORT).show();
            }
        });

        viewHolder.mItem = data.get(i);
        viewHolder.title.setText(viewHolder.mItem.getName());
        viewHolder.distance.setText(viewHolder.mItem.getStatus());

        Glide.with(context).load(viewHolder.mItem.getCoverImage()).into(viewHolder.bgImage);
        viewHolder.bgImage.setOnClickListener(v -> mListener.goPoiDetails(v, viewHolder.mItem.getId()));
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        final View mView;
        final TextView title, distance;
        final ImageView bgImage;
        PoiResponse mItem;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            mView = itemView;
            title = itemView.findViewById(R.id.poi_list_title);
            distance = itemView.findViewById(R.id.poi_list_distance);
            bgImage = itemView.findViewById(R.id.poi_list_bgImage);
        }

    }
}
