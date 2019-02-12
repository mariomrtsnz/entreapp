package com.mario.myapplication.util;

import android.content.Context;
import android.content.SharedPreferences;

import com.mario.myapplication.R;

public class UtilToken {
    public static void setToken(Context mContext, String token) {
        SharedPreferences sharedPreferences =
                mContext.getSharedPreferences(
                        mContext.getString(R.string.sharedpreferences_filename),
                        Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(mContext.getString(R.string.jwt_key), token);
        editor.commit();
    }
    public static void setId(Context mContext, String id) {
        SharedPreferences sharedPreferences =
                mContext.getSharedPreferences(
                        mContext.getString(R.string.sharedpreferences_filename),
                        Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(mContext.getString(R.string.userId), id);
        editor.commit();
    }
    public static String getId(Context mContext) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                mContext.getString(R.string.sharedpreferences_filename),
                Context.MODE_PRIVATE
        );

        String id = sharedPreferences
                .getString(mContext.getString(R.string.userId), null);

        return id;
    }


    public static String getToken(Context mContext) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                mContext.getString(R.string.sharedpreferences_filename),
                Context.MODE_PRIVATE
        );

        String jwt = sharedPreferences
                .getString(mContext.getString(R.string.jwt_key), null);

        return jwt;
    }


}
