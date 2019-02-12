package com.mario.myapplication.ui.people;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.ui.people.PeopleFragment.OnListFragmentUserInteractionListener;
import com.mario.myapplication.ui.people.dummy.DummyContent.DummyItem;

import java.util.List;

/**
 * {@link RecyclerView.Adapter} that can display a {@link DummyItem} and makes a call to the
 * specified {@link}.
 * TODO: Replace the implementation with code for your data type.
 */
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
//        holder.mIdView.setText(mValues.get(position).id);
//        holder.mContentView.setText(mValues.get(position).content);
        holder.name.setText(mValues.get(position).getName());
        holder.country.setText(mValues.get(position).getCountry());
        Glide.with(holder.mView).load(mValues.get(position).getPicture()).into(holder.picture);
        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onListFragmentUserInteraction(holder.mItem);
                }
            }
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
