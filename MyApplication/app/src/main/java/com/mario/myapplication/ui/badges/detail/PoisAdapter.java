package com.mario.myapplication.ui.badges.detail;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.BadgePoiResponse;
import com.mario.myapplication.responses.PoiResponse;

import java.util.List;

public class PoisAdapter extends RecyclerView.Adapter<PoisAdapter.ViewHolder> {
    private Context ctx;
    private List<BadgePoiResponse> items;
    private final BadgeDetailListener mListener;

    public PoisAdapter(Context ctx, List<BadgePoiResponse> items, BadgeDetailListener mListener) {
        this.ctx = ctx;
        this.items = items;
        this.mListener = mListener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(ctx).inflate(R.layout.badge_detail_poi_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, int position) {
        holder.name.setText(items.get(position).getName());
    }

    @Override
    public int getItemCount() {
//        return items.size();
        return 0;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final ImageView coverImage;
        public final TextView name;
        public final View mView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            mView = itemView;
            coverImage = itemView.findViewById(R.id.badge_detail_poi_cover);
            name = itemView.findViewById(R.id.badge_detail_poi_title);
        }
    }
}
