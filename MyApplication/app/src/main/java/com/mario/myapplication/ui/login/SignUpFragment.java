package com.mario.myapplication.ui.login;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
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
import com.mario.myapplication.R;
import com.mario.myapplication.responses.LoginResponse;
import com.mario.myapplication.responses.Register;
import com.mario.myapplication.retrofit.generator.ServiceGenerator;
import com.mario.myapplication.retrofit.services.LoginService;
import com.mario.myapplication.ui.common.DashboardActivity;
import com.mario.myapplication.util.UtilToken;
import com.transitionseverywhere.ChangeBounds;
import com.transitionseverywhere.Transition;
import com.transitionseverywhere.TransitionManager;
import com.transitionseverywhere.TransitionSet;

import java.util.List;
import java.util.regex.Pattern;

import butterknife.BindViews;
import retrofit2.Call;
import retrofit2.Response;


public class SignUpFragment extends AuthFragment {
    @BindViews(value = {R.id.email_input_edit_sign,
            R.id.password_input_edit_sign,
            R.id.confirm_password_edit})
    protected List<TextInputEditText> views;
    EditText email_input, password_input, confirm_password;
    Context ctx = this.getContext();

    // Acciones al crear el fragmento
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        ctx = view.getContext();
        email_input = getActivity().findViewById(R.id.email_input_edit_sign);
        password_input = getActivity().findViewById(R.id.password_input_edit_sign);
        confirm_password = getActivity().findViewById(R.id.confirm_password_edit);

        if (this.getContext() != null) {
            view.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.color_sign_up));
            caption.setText(getString(R.string.sign_up_label));
            for (TextInputEditText editText : views) {
                if (editText.getId() == R.id.password_input_edit) {
                    final TextInputLayout inputLayout = view.findViewById(R.id.password_input);
                    final TextInputLayout confirmLayout = view.findViewById(R.id.confirm_password);
                    Typeface boldTypeface = Typeface.defaultFromStyle(Typeface.BOLD);
                    inputLayout.setTypeface(boldTypeface);
                    confirmLayout.setTypeface(boldTypeface);
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
            caption.setVerticalText(true);
            foldStuff();
            caption.setTranslationX(getTextPadding());
        }
    }

    @Override
    public int authLayout() {
        return R.layout.fragment_signup;
    }

    @Override
    public void clearFocus() {
        for (View view : views) view.clearFocus();
    }

    // Acciones al tener estar en el fragmento de al lado
    @Override
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
        set.addListener(new Transition.TransitionListenerAdapter() {
            @Override
            public void onTransitionEnd(Transition transition) {
                super.onTransitionEnd(transition);
                caption.setTranslationX(getTextPadding());
                caption.setRotation(0);
                caption.setVerticalText(true);
                caption.requestLayout();

            }
        });
        TransitionManager.beginDelayedTransition(parent, set);
        foldStuff();
        caption.setTranslationX(-caption.getWidth() / 8 + getTextPadding());
        caption.setClickable(false);
    }

    private void foldStuff() {
        caption.setTextSize(TypedValue.COMPLEX_UNIT_PX, caption.getTextSize() / 2f);
        caption.setTextColor(Color.WHITE);
        ConstraintLayout.LayoutParams params = getParams();
        params.rightToRight = ConstraintLayout.LayoutParams.UNSET;
        params.verticalBias = 0.5f;
        caption.setLayoutParams(params);
    }

    private float getTextPadding() {
        return getResources().getDimension(R.dimen.folded_label_padding) / 2.1f;
    }

    // Acciones cuando se está viendo el registro
    @Override
    public void unfold() {
        super.unfold();
        caption.setOnClickListener(view -> {

            // Recoger los datos del formulario
            String email = email_input.getText().toString();
            String password = password_input.getText().toString();
            String confirm = confirm_password.getText().toString();
            final Pattern EMAIL_REGEX = Pattern.compile("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", Pattern.CASE_INSENSITIVE);

            if (email.equals("") || password.equals("")) {
                Toast.makeText(view.getContext(), "Fields can't be clear!", Toast.LENGTH_SHORT).show();
            } else if (!EMAIL_REGEX.matcher(email).matches()) {
                Toast.makeText(ctx, "You need to use a correct email!", Toast.LENGTH_LONG).show();
            } else if (password.length() < 6) {
                Toast.makeText(ctx, "Password must be at least 6 characters!", Toast.LENGTH_LONG).show();
            } else if (!password.equals(confirm)) {
                Toast.makeText(view.getContext(), "Passwords do not match!", Toast.LENGTH_SHORT).show();
            }else{
                Register register = new Register(email, password);
                LoginService service = ServiceGenerator.createService(LoginService.class);
                Call<LoginResponse> loginReponseCall = service.doSignUp(register);

                loginReponseCall.enqueue(new retrofit2.Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        if (response.code() == 201) {
                            // éxito
                            UtilToken.setToken(view.getContext(), response.body().getToken());
                            startActivity(new Intent(view.getContext(), DashboardActivity.class));
                        } else {
                            // error
                            Toast.makeText(view.getContext(), "Error while signing up.", Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        Log.e("NetworkFailure", t.getMessage());
                        Toast.makeText(view.getContext(), "Network Connection Failure", Toast.LENGTH_SHORT).show();

                    }
                });
            }
        });
    }
}
