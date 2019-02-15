package com.mario.myapplication.ui.people.details;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.mario.myapplication.responses.MyProfileResponse;
public class PeopleViewModel extends ViewModel {
    private final MutableLiveData<MyProfileResponse> user = new MutableLiveData<MyProfileResponse>();
    public void selectUser(MyProfileResponse u) {
        user.setValue(u);
    }
    public LiveData<MyProfileResponse> getSelectedUser() {
        return user;
    }
}
