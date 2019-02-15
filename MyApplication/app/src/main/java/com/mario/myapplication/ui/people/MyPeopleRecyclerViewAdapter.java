package com.mario.myapplication.ui.people;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.ui.people.PeopleFragment.OnListFragmentUserInteractionListener;

import java.util.List;


public class MyPeopleRecyclerViewAdapter extends RecyclerView.Adapter<MyPeopleRecyclerViewAdapter.ViewHolder> {

    private final List<UserResponse> mValues;
    private final PeopleFragment.OnListFragmentUserInteractionListener mListener;
    Context ctx;

    public MyPeopleRecyclerViewAdapter(Context ctx, List<UserResponse> items, OnListFragmentUserInteractionListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_people, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.name.setText(mValues.get(position).getName());
        holder.country.setText(mValues.get(position).getCountry());
        Glide.with(holder.mView).load(mValues.get(position).getPicture()).into(holder.picture);
        holder.mView.setOnClickListener(v -> {
            if (null != mListener) {
                mListener.onListFragmentUserInteraction(holder.mItem);
            }
        });

        holder.action.setOnClickListener(v -> {
            if(holder.action.getDrawable().equals(R.drawable.ic_person_add))
                holder.action.setImageResource(R.drawable.ic_delete);
            else
                holder.action.setImageResource(R.drawable.ic_person_add);
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView name;
        public final TextView country;
        public final ImageView picture;
        public final ImageButton action;
        public UserResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            name = view.findViewById(R.id.user_name);
            country = view.findViewById(R.id.country);
            picture = view.findViewById(R.id.profilePic);
            action = view.findViewById(R.id.actionButton);

        }

    }
}
