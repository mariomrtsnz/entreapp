package com.mario.myapplication.util;

import com.google.gson.Gson;

public class ConfigJSONParser {

    public static Object parseStringToObject(String json) {
        String object = json;
        Gson gson = new Gson();
        Object objects = gson.fromJson(object, Object.class);
        return objects;
    }
}
