package com.mario.myapplication.ui.profile;

import android.widget.EditText;

import java.util.regex.Pattern;

public  class ValidatorUserEdit {
    public ValidatorUserEdit()  {

    }

    public static void setError(EditText editText, String errorString) {

        editText.setError(errorString);

    }

    public static void clearError(EditText editText) {

        editText.setError(null);

    }
    public static boolean onlyLetters(EditText editText) {
        boolean isValid=true;
        int limit=9;
        String text = editText.getText().toString();
        for (int i=0;i<=limit;i++){
            if (text.contains(String.valueOf(i))){
                isValid=false;
            }
        }
        return isValid;
    }
    public static boolean isNotEmpty(EditText editText) {
        boolean isValid=true;
        if (editText.getText().toString().isEmpty())
            isValid=false;
        return isValid;
    }



}
