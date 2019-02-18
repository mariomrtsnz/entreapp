package com.mario.myapplication.ui.routes;

import android.content.Context;
import android.graphics.drawable.PictureDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestBuilder;
import com.mario.myapplication.R;
import com.mario.myapplication.model.Route;
import com.mario.myapplication.responses.RouteResponse;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.util.SvgSoftwareLayerSetter;
import com.mario.myapplication.util.UtilToken;

import java.util.List;

public class RoutesAdapter extends RecyclerView.Adapter<RoutesAdapter.ViewHolder>{
    private final RouteListener mListener;
    UserResponse user;
    private List<RouteResponse> data;
    private Context context;
    private UserService service;
    private String jwt;
    private RequestBuilder<PictureDrawable> requestBuilder;


    public RoutesAdapter(Context ctx, List<RouteResponse> data, RouteListener mListener) {
        this.data = data;
        this.context = ctx;
        this.mListener = mListener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.routes_custom_item, viewGroup, false);
        requestBuilder = Glide.with(context).as(PictureDrawable.class).listener(new SvgSoftwareLayerSetter<>());
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder viewHolder, int i) {
        jwt = UtilToken.getToken(context);
        viewHolder.mItem = data.get(i);
        viewHolder.title.setText(data.get(i).getName());

        viewHolder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.onRouteClick(v, viewHolder.mItem);
            }
        });
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView title;
        public RouteResponse mItem;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            mView = itemView;
            title = itemView.findViewById(R.id.tv_card_title);
        }

    }
}
