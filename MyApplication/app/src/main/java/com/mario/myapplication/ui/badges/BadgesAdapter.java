package com.mario.myapplication.ui.badges;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.BadgeResponse;

import java.util.List;

class BadgesAdapter extends RecyclerView.Adapter<BadgesAdapter.ViewHolder> {
    private List<BadgeResponse> data;
    private Context context;
    private final BadgeListener mListener;


    public BadgesAdapter(Context ctx, int layoutId, List<BadgeResponse> data, BadgeListener mListener) {
        this.data = data;
        this.context = ctx;
        this.mListener = mListener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.nota_custom, viewGroup, false));
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder viewHolder, int i) {
        viewHolder.mItem = data.get(i);
        viewHolder.title.setText(data.get(i).getTitle());
        if (data.get(i).isFav()) {
            viewHolder.fav.setImageResource(R.drawable.ic_favorite_black_24dp);
        } else {
            viewHolder.fav.setImageResource(R.drawable.ic_favorite_border_black_24dp);
        }
        viewHolder.fav.setOnClickListener(new View.OnClickListener() {
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
        public BadgeResponse mItem;
        public final TextView title, body;
        public final ImageView fav;
        public CardView card;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.tv_card_title);
            body = itemView.findViewById(R.id.tv_card_body);
            fav = itemView.findViewById(R.id.iv_fav_icon);
            card = itemView.findViewById(R.id.card);
        }

    }

}
