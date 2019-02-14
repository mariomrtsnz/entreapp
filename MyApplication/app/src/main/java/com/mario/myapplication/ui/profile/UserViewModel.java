package com.mario.myapplication.ui.profile;

import androidx.lifecycle.ViewModel;

import com.mario.myapplication.responses.MyProfileResponse;

public class UserViewModel extends ViewModel {
    private final MyProfileResponse user = new MyProfileResponse();

    // Master > Detail (comunicación del dato)
    public void selectUser(MyProfileResponse u) {
        user.setBadges(u.getBadges());
        user.setCountry(u.getCountry());
        user.setCreateAt(u.getCreateAt());
        user.setEmail(u.getEmail());
        user.setId(u.getId());
        user.setLanguage(u.getLanguage());
        user.setLikes(u.getLikes());
        user.setName(u.getName());
        user.setPicture(u.getPicture());
        user.setRole(u.getRole());
        user.setVisited(u.getVisited());
    }

    public MyProfileResponse getSelectedUser() {
        return user;
    }
}
