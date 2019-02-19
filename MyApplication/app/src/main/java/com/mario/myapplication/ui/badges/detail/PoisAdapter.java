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
import com.mario.myapplication.responses.PoiResponse;

import java.util.List;

public class PoisAdapter extends RecyclerView.Adapter<PoisAdapter.ViewHolder> {
    private Context ctx;
    private List<PoiResponse> items;
    private final BadgeDetailListener mListener;

    public PoisAdapter(Context ctx, List<PoiResponse> items, BadgeDetailListener mListener) {
        this.ctx = ctx;
        this.items = items;
        this.mListener = mListener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(ctx).inflate(R.layout.badge_detail_poi_item, parent, false);
        return new PoisAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
//        return items.size();
        return items.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final ImageView coverImage;
        public final TextView name;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            coverImage = itemView.findViewById(R.id.badge_detail_poi_cover);
            name = itemView.findViewById(R.id.badge_detail_poi_title);
        }

        @Override
        public String toString() {
            return super.toString();
        }
    }
}
