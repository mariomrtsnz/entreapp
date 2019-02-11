package com.mario.myapplication.ui.categories;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.ui.categories.CategoryFragment.OnListFragmentCategoryInteractionListener;


import java.util.List;

/**
 * {@link RecyclerView.Adapter} that can display a {@link} and makes a call to the
 * specified {@link }.
 * TODO: Replace the implementation with code for your data type.
 */
class MyCategoryRecyclerViewAdapter extends RecyclerView.Adapter<MyCategoryRecyclerViewAdapter.ViewHolder> {

    private final List<CategoryResponse> mValues;
    private final OnListFragmentCategoryInteractionListener mListener;

    public MyCategoryRecyclerViewAdapter(Context ctx, List<CategoryResponse> items, OnListFragmentCategoryInteractionListener listener) {
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_category, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.name.setText(mValues.get(position).getName());
        if (mValues.get(position).getParent() == null){
            holder.parent.setText("No parent category");
        }else{
            holder.parent.setText(mValues.get(position).getParent().getName());
        }
        if(mValues.get(position).isFav()){
            holder.fav.setImageResource(R.drawable.ic_fav_24dp);
        }else{
            holder.fav.setImageResource(R.drawable.ic_nofav_24dp);
        }

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onListFragmentCategoryInteraction(holder.mItem);
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
        public final TextView parent;
        public final ImageView fav;
        public CategoryResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            name = view.findViewById(R.id.category_name);
            parent = view.findViewById(R.id.category_parent);
            fav = view.findViewById(R.id.category_fav);
        }

    }
}
