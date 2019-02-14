package com.mario.myapplication.ui.profile;

import com.mario.myapplication.responses.MyProfileResponse;

public interface MyProfileInteractionListener {
    public void clickOnCamera();
    public void editUser(MyProfileResponse u);
}
