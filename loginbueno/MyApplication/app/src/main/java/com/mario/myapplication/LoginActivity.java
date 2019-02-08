package com.mario.myapplication;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.graphics.Bitmap;
import android.graphics.Point;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.widget.ImageView;

import androidx.annotation.ColorRes;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.drawable.DrawableCompat;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.ImageViewTarget;

import java.util.List;

import butterknife.BindViews;
import butterknife.ButterKnife;

public class LoginActivity extends AppCompatActivity {

  @BindViews(value = {R.id.logo, R.id.first, R.id.second})
  protected List<ImageView> sharedElements;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_login);
    ButterKnife.bind(this);
    final AnimatedViewPager pager = findViewById(R.id.pager);
    final ImageView background = findViewById(R.id.scrolling_background);
    int[] screenSize = screenSize();

    for (ImageView element : sharedElements) {
      @ColorRes int color = element.getId() != R.id.logo ? R.color.white_transparent : R.color.color_logo_log_in;
      DrawableCompat.setTint(element.getDrawable(), ContextCompat.getColor(this, color));
    }
    //load a very big image and resize it, so it fits our needs
    Glide.with(this).asBitmap()
            .load(R.drawable.login_bg)
            .into(new ImageViewTarget<Bitmap>(background) {
              @Override
              protected void setResource(Bitmap resource) {
                background.setImageBitmap(resource);
                background.post(() -> {
                  //we need to scroll to the very left edge of the image
                  //fire the scale animation
                  background.scrollTo(-background.getWidth() / 2, 0);
                  ObjectAnimator xAnimator = ObjectAnimator.ofFloat(background, View.SCALE_X, 1f, background.getScaleX());
                  ObjectAnimator yAnimator = ObjectAnimator.ofFloat(background, View.SCALE_Y, 1f, background.getScaleY());
                  AnimatorSet set = new AnimatorSet();
                  set.playTogether(xAnimator, yAnimator);
                  set.setDuration(getResources().getInteger(R.integer.duration));
                  set.start();
                });
                pager.post(() -> {
                  AuthAdapter adapter = new AuthAdapter(getSupportFragmentManager(), pager, background, sharedElements);
                  pager.setAdapter(adapter);
                });
              }
            });
  }

  private int[] screenSize() {
    Display display = getWindowManager().getDefaultDisplay();
    Point size = new Point();
    display.getSize(size);
    return new int[]{size.x, size.y};
  }
}
