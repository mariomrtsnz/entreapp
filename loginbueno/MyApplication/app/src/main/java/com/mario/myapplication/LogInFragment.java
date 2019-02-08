package com.mario.myapplication;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.text.Editable;
import android.util.Log;
import android.util.TypedValue;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;

import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.mario.myapplication.responses.LoginResponse;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.LoginService;
import com.mario.myapplication.util.UtilToken;
import com.transitionseverywhere.ChangeBounds;
import com.transitionseverywhere.Transition;
import com.transitionseverywhere.TransitionManager;
import com.transitionseverywhere.TransitionSet;

import java.util.List;

import butterknife.BindViews;
import butterknife.ButterKnife;
import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LogInFragment extends AuthFragment {

 TextInputLayout email_input, password_input;
  VerticalTextView login;
  Context ctx = this.getContext();

//  @Override
//  public void onCreate(@Nullable Bundle savedInstanceState) {
//    super.onCreate(savedInstanceState);
//
//
//  }

  @BindViews(value = {R.id.email_input_edit, R.id.password_input_edit})
  protected List<TextInputEditText> views;

  @Override
  public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
    super.onViewCreated(view, savedInstanceState);

    email_input = getActivity().findViewById(R.id.email_input);
    password_input = getActivity().findViewById(R.id.password_input);
    login = getActivity().findViewById(R.id.caption);

    login.setOnClickListener(v -> {


      String username_txt = email_input.getEditText().getText().toString();
      String password_txt = password_input.getEditText().getText().toString();

      String credentials = Credentials.basic(username_txt, password_txt);

      LoginService service = ServiceGenerator.createService(LoginService.class);
      Call<LoginResponse> call = service.doLogin(credentials);

      call.enqueue(new retrofit2.Callback<LoginResponse>() {
        @Override
        public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
          if (response.code() != 201) {
            // error
            Log.e("RequestError", response.message());
            Toast.makeText(ctx, "Error de petición", Toast.LENGTH_SHORT).show();
          } else {
            // exito
            UtilToken.setToken(ctx, response.body().getToken());

            startActivity(new Intent(ctx, HomeActivity.class));
          }
        }

        @Override
        public void onFailure(Call<LoginResponse> call, Throwable t) {
          Log.e("NetworkFailure", t.getMessage());
          Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
        }
      });


    });

    if (view != null) {
      caption.setText(getString(R.string.log_in_label));
      view.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.color_log_in));
      for (TextInputEditText editText : views) {
        if (editText.getId() == R.id.password_input_edit) {
          final TextInputLayout inputLayout = getActivity().findViewById(R.id.password_input);
          Typeface boldTypeface = Typeface.defaultFromStyle(Typeface.BOLD);
          inputLayout.setTypeface(boldTypeface);
          editText.addTextChangedListener(new TextWatcherAdapter() {
            @Override
            public void afterTextChanged(Editable editable) {
              inputLayout.setPasswordVisibilityToggleEnabled(editable.length() > 0);
            }
          });
        }
        editText.setOnFocusChangeListener((temp, hasFocus) -> {
          if (!hasFocus) {
            boolean isEnabled = editText.getText().length() > 0;
            editText.setSelected(isEnabled);
          }
        });
      }
    }
  }

  @Override
  public int authLayout() {
    return R.layout.fragment_log_in;
  }

  @Override
  @TargetApi(Build.VERSION_CODES.LOLLIPOP)
  public void fold() {
    lock = false;
    Rotate transition = new Rotate();
    transition.setEndAngle(-90f);
    transition.addTarget(caption);
    TransitionSet set = new TransitionSet();
    set.setDuration(getResources().getInteger(R.integer.duration));
    ChangeBounds changeBounds = new ChangeBounds();
    set.addTransition(changeBounds);
    set.addTransition(transition);
    TextSizeTransition sizeTransition = new TextSizeTransition();
    sizeTransition.addTarget(caption);
    set.addTransition(sizeTransition);
    set.setOrdering(TransitionSet.ORDERING_TOGETHER);
    final float padding = getResources().getDimension(R.dimen.folded_label_padding) / 2;
    set.addListener(new Transition.TransitionListenerAdapter() {
      @Override
      public void onTransitionEnd(Transition transition) {
        super.onTransitionEnd(transition);
        caption.setTranslationX(-padding);
        caption.setRotation(0);
        caption.setVerticalText(true);
        caption.requestLayout();

      }
    });
    TransitionManager.beginDelayedTransition(parent, set);
    caption.setTextSize(TypedValue.COMPLEX_UNIT_PX, caption.getTextSize() / 2);
    caption.setTextColor(Color.WHITE);
    ConstraintLayout.LayoutParams params = getParams();
    params.leftToLeft = ConstraintLayout.LayoutParams.UNSET;
    params.verticalBias = 0.5f;
    caption.setLayoutParams(params);
    caption.setTranslationX(caption.getWidth() / 8 - padding);
  }

  @Override
  public void clearFocus() {
    for (View view : views) view.clearFocus();
  }

}
