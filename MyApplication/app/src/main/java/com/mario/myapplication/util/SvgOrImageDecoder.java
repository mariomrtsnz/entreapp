package com.mario.myapplication.util;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.load.Options;
import com.bumptech.glide.load.ResourceDecoder;
import com.bumptech.glide.load.engine.Resource;

import java.io.IOException;
import java.io.InputStream;

public class SvgOrImageDecoder implements ResourceDecoder<InputStream, SvgOrImageDecodedResource> {
    @Override
    public boolean handles(@NonNull InputStream source, @NonNull Options options) throws IOException {
        return true;
    }

    @Nullable
    @Override
    public Resource<SvgOrImageDecodedResource> decode(@NonNull InputStream source, int width, int height, @NonNull Options options) throws IOException {
        return null;
    }
}
