package com.mario.myapplication.ui.categories;

import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.mario.myapplication.R;
import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.ui.categories.CategoryFragment.OnListFragmentInteractionListener;
import com.mario.myapplication.ui.categories.dummy.DummyContent.DummyItem;

import java.util.List;

/**
 * {@link RecyclerView.Adapter} that can display a {@link DummyItem} and makes a call to the
 * specified {@link OnListFragmentInteractionListener}.
 * TODO: Replace the implementation with code for your data type.
 */
public class MyCategoryRecyclerViewAdapter extends RecyclerView.Adapter<MyCategoryRecyclerViewAdapter.ViewHolder> {

    private final List<CategoryResponse> mValues;
    private final OnListFragmentInteractionListener mListener;

    public MyCategoryRecyclerViewAdapter(List<CategoryResponse> items, OnListFragmentInteractionListener listener) {
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
        holder.name.setText(mValues.get(position).getCategory().getName());
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
                    mListener.onListFragmentInteraction(holder.mItem);
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
