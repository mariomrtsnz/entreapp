package com.mario.myapplication.ui.categories;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.mario.myapplication.R;
import com.mario.myapplication.dto.UserEditDto;
import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.retrofit.generator.AuthType;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.UserService;
import com.mario.myapplication.ui.categories.CategoryFragment.OnListFragmentCategoryInteractionListener;
import com.mario.myapplication.util.UserStringList;
import com.mario.myapplication.util.UtilToken;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

class MyCategoryRecyclerViewAdapter extends RecyclerView.Adapter<MyCategoryRecyclerViewAdapter.ViewHolder> {

    private final List<CategoryResponse> mValues;
    private final OnListFragmentCategoryInteractionListener mListener;
    Context ctx;
    Gson gson = new Gson();
    UserResponse user;
    String idUser;
    private UserService service;
    private String jwt;

    public MyCategoryRecyclerViewAdapter(Context ctx, List<CategoryResponse> items, OnListFragmentCategoryInteractionListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_category, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        jwt = UtilToken.getToken(ctx);
        idUser = UtilToken.getId(ctx);

        service = ServiceGenerator.createService(UserService.class, jwt, AuthType.JWT);

        Call<UserResponse> call = service.getUserResponse(idUser);

        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    user = response.body();
                } else {
                    Toast.makeText(ctx, "You have to be logged in", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(ctx, "You have to be logged in", Toast.LENGTH_SHORT).show();
            }
        });


        holder.mItem = mValues.get(position);
        holder.name.setText(mValues.get(position).getName());
        if (mValues.get(position).getParent() == null) {
            holder.parent.setText("No parent category");
        } else {
            holder.parent.setText(mValues.get(position).getParent().getName());
        }
        if (mValues.get(position).isFav()) {
            holder.fav.setImageResource(R.drawable.ic_fav_24dp);
        } else {
            holder.fav.setImageResource(R.drawable.ic_nofav_24dp);
        }

        holder.mView.setOnClickListener(v -> {
            if (null != mListener) {
                // Notify the active callbacks interface (the activity, if the
                // fragment is attached to one) that an item has been selected.
                mListener.onListFragmentCategoryInteraction(holder.mItem);
            }
        });

        try {
            holder.fav.setOnClickListener(v -> {
                if (user.getLikes().size() == 0) {
                    holder.mItem.setFav(true);
                    user.getLikes().add(holder.mItem);
                    holder.fav.setImageResource(R.drawable.ic_fav_24dp);
                } else {


                    for (CategoryResponse category : user.getLikes()) {
                        if (holder.mItem.getName().equals(category.getName())) {
                            user.getLikes().remove(category);
                            holder.fav.setImageResource(R.drawable.ic_nofav_24dp);
                        } else {
                            category.setFav(true);
                            user.getLikes().add(category);
                            holder.fav.setImageResource(R.drawable.ic_fav_24dp);
                        }

                    }
                }
                System.out.println(user);
                UserEditDto edited = new UserEditDto(user.getEmail(), UserStringList.arrayFriends(user), UserStringList.arrayFavs(user), /*user.getLanguage().getId(),*/ UserStringList.arrayLikes(user), user.getName());
                Call<UserResponse> edit = service.editUser(UtilToken.getId(ctx), edited);
                edit.enqueue(new Callback<UserResponse>() {
                    @Override
                    public void onResponse(Call<UserResponse> call1, Response<UserResponse> response) {
                        System.out.println(response);
                        if (response.code() == 200) {
                            Log.d("User edited", "User edited");
                        } else {
                            Toast.makeText(ctx, "User could not be edited", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<UserResponse> call1, Throwable t) {
                       // Toast.makeText(ctx, "NetworkFailure", Toast.LENGTH_LONG).show();
                    }
                });

            });
        } catch (Exception e) {
            e.printStackTrace();
        }

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
            name = view.findViewById(R.id.user_name);
            parent = view.findViewById(R.id.category_parent);
            fav = view.findViewById(R.id.category_fav);
        }

    }
}
