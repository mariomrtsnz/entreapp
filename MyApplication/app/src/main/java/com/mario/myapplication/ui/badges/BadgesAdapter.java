package com.mario.myapplication.ui.badges;

import android.content.Context;
import android.graphics.drawable.PictureDrawable;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestBuilder;
import com.bumptech.glide.load.model.StreamEncoder;
import com.caverock.androidsvg.SVG;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.BadgeResponse;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.util.SvgDecoder;
import com.mario.myapplication.util.SvgDrawableTranscoder;
import com.mario.myapplication.util.SvgSoftwareLayerSetter;
import com.mario.myapplication.util.UtilToken;

import java.io.InputStream;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

class BadgesAdapter extends RecyclerView.Adapter<BadgesAdapter.ViewHolder> {
    private List<BadgeResponse> data;
    private Context context;
    private final BadgeListener mListener;
    private UserService service;
    UserResponse user;
    private String jwt;
    private RequestBuilder<PictureDrawable> requestBuilder;


    public BadgesAdapter(Context ctx, List<BadgeResponse> data, BadgeListener mListener) {
        this.data = data;
        this.context = ctx;
        this.mListener = mListener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.badges_custom_item, viewGroup, false);
        requestBuilder = Glide.with(context).as(PictureDrawable.class).listener(new SvgSoftwareLayerSetter<>());
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder viewHolder, int i) {
        jwt = UtilToken.getToken(context);
        service = ServiceGenerator.createService(UserService.class, jwt, AuthType.JWT);
        Call<UserResponse> call = service.getMe();
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()){
                    user = response.body();
                }else{
                    Toast.makeText(context, "You have to be logged in", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(context, "You have to be logged in", Toast.LENGTH_SHORT).show();
            }
        });

        viewHolder.mItem = data.get(i);
        viewHolder.title.setText(data.get(i).getName());
        viewHolder.body.setText(data.get(i).getDescription());
        viewHolder.points.setText(String.valueOf(data.get(i).getPoints()));

        requestBuilder.load(data.get(i).getIcon()).into(viewHolder.icon);

        viewHolder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.onBadgeClick(v, viewHolder.mItem);
            }
        });
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public BadgeResponse mItem;
        public final TextView title, body, points;
        public final ImageView earned;
        public final ImageView icon;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            mView = itemView;
            title = itemView.findViewById(R.id.tv_card_title);
            body = itemView.findViewById(R.id.tv_card_body);
            earned = itemView.findViewById(R.id.iv_earned_icon);
            icon = itemView.findViewById(R.id.iv_badge_icon);
            points = itemView.findViewById(R.id.tv_badge_points);
        }

    }

}
