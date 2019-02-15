package com.mario.myapplication.ui.badges;

import android.content.Context;
import android.graphics.drawable.PictureDrawable;
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
import com.mario.myapplication.R;
import com.mario.myapplication.responses.BadgeResponse;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.util.SvgSoftwareLayerSetter;
import com.mario.myapplication.util.UtilToken;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

class BadgesAdapter extends RecyclerView.Adapter<BadgesAdapter.ViewHolder> {
    private final BadgeListener mListener;
    UserResponse user;
    private List<BadgeResponse> data;
    private Context context;
    private UserService service;
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
        for (BadgeResponse badgeResponse : data) {
            if (badgeResponse.isEarned()) {
                viewHolder.earned.setVisibility(View.VISIBLE);
            }
        }

        viewHolder.mItem = data.get(i);
        viewHolder.title.setText(data.get(i).getName());
        viewHolder.body.setText(data.get(i).getDescription());
        viewHolder.points.setText(String.valueOf(data.get(i).getPoints()));

        Glide.with(context).load(data.get(i).getIcon()).into(viewHolder.icon);

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
        public final TextView title, body, points;
        public final ImageView earned;
        public final ImageView icon;
        public BadgeResponse mItem;

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
