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
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;

import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.mario.myapplication.responses.LoginResponse;
import com.mario.myapplication.responses.Register;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.LoginService;
import com.mario.myapplication.util.UtilToken;
import com.transitionseverywhere.ChangeBounds;
import com.transitionseverywhere.Transition;
import com.transitionseverywhere.TransitionManager;
import com.transitionseverywhere.TransitionSet;

import java.util.List;
import java.util.regex.Pattern;

import butterknife.BindViews;
import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Response;

public class LogInFragment extends AuthFragment {

 TextInputLayout email_input, password_input;
  Context ctx = this.getContext();


  @BindViews(value = {R.id.email_input_edit, R.id.password_input_edit})
  protected List<TextInputEditText> views;

  // Acciones al crearse el fragmento
  @Override
  public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
    super.onViewCreated(view, savedInstanceState);
    ctx = view.getContext();

    email_input = getActivity().findViewById(R.id.email_input);
    password_input = getActivity().findViewById(R.id.password_input);

    if (this.getContext() != null) {
      caption.setText(getString(R.string.log_in_label));
      view.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.color_log_in));
      for (TextInputEditText editText : views) {
        if (editText.getId() == R.id.password_input_edit) {
          final TextInputLayout inputLayout = view.findViewById(R.id.password_input);
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

  // Acciones cuando el fragmento está en el lateral (Solo se ven las letras)
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
    caption.setClickable(false);
  }

  @Override
  public void clearFocus() {
    for (View view : views) view.clearFocus();
  }

  // Acciones cuando el fragmento está viendose
    @Override
    public void unfold() {
        super.unfold();
        caption.setOnClickListener(view -> {
            // Recoger datos del formulario
            String username_txt = email_input.getEditText().getText().toString();
            String password_txt = password_input.getEditText().getText().toString();
            final Pattern EMAIL_REGEX = Pattern.compile("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", Pattern.CASE_INSENSITIVE);

            if (username_txt.equals("") || password_txt.equals("")) {
                Toast.makeText(ctx, "Fields can't be clear!", Toast.LENGTH_LONG).show();
            } else if (!EMAIL_REGEX.matcher(username_txt).matches()) {
                Toast.makeText(ctx, "You need to use a correct email!", Toast.LENGTH_LONG).show();
            } else if (password_txt.length() < 6) {
                Toast.makeText(ctx, "Password must be at least 6 characters!", Toast.LENGTH_LONG).show();
            } else {
                String credentials = Credentials.basic(username_txt, password_txt);
                LoginService service = ServiceGenerator.createService(LoginService.class);
                Call<LoginResponse> call = service.doLogin(credentials);

                call.enqueue(new retrofit2.Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        if (response.code() != 201) {
                            // error
                            Log.e("RequestError", response.message());
                            Toast.makeText(view.getContext(), "Error while trying to login", Toast.LENGTH_SHORT).show();
                        } else {
                            // exito
                            UtilToken.setToken(view.getContext(), response.body().getToken());

                            startActivity(new Intent(view.getContext(), HomeActivity.class));
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        Log.e("NetworkFailure", t.getMessage());
                        Toast.makeText(view.getContext(), "Error. Can't connect to server", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}
