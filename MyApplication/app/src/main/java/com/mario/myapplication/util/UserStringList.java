package com.mario.myapplication.util;

import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.responses.PoiResponse;
import com.mario.myapplication.responses.UserResponse;

import java.util.ArrayList;
import java.util.List;

public class UserStringList {


    public static List<String> arrayFavs(UserResponse user){
        List<String> favs = new ArrayList<>();

        for(PoiResponse fav : user.getFavs()){
            favs.add(fav.getId());
        }

        return favs;
    }

    public static List<String> arrayFriends(UserResponse user){
        List<String> friends = new ArrayList<>();

        for(UserResponse friend : user.getFriends()){
            friends.add(friend.get_Id());
        }

        return friends;
    }

    public static List<String> arrayVisited(UserResponse user){
        List<String> visited = new ArrayList<>();

        for(PoiResponse visit : user.getVisited()){
            visited.add(visit.getId());
        }

        return visited;
    }

    public static List<String> arrayLikes(UserResponse user){
        List<String> likes = new ArrayList<>();

        for(CategoryResponse like : user.getLikes()){
            likes.add(like.getId());
        }

        return likes;
    }
}
