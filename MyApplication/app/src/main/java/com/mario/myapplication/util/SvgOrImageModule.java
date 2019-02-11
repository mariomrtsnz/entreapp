package com.mario.myapplication.util;

import android.content.Context;
import android.graphics.drawable.PictureDrawable;

import androidx.annotation.NonNull;

import com.bumptech.glide.Glide;
import com.bumptech.glide.Registry;
import com.bumptech.glide.module.AppGlideModule;

import java.io.InputStream;

public class SvgOrImageModule extends AppGlideModule {
    @Override
    public boolean isManifestParsingEnabled() {
        return false;
    }

    @Override
    public void registerComponents(@NonNull Context context, @NonNull Glide glide, @NonNull Registry registry) {
        registry.register(SvgOrImageDecodedResource.class, PictureDrawable.class, new SvgOrImageDrawableTranscoder()).append(InputStream.class, SvgOrImageDecodedResource.class, new SvgOrImageDecoder());
    }
}
