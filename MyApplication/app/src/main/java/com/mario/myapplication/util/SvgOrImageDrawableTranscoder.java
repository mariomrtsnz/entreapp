package com.mario.myapplication.util;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Picture;
import android.graphics.RectF;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.PictureDrawable;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.load.Options;
import com.bumptech.glide.load.engine.Resource;
import com.bumptech.glide.load.resource.SimpleResource;
import com.bumptech.glide.load.resource.transcode.ResourceTranscoder;

public class SvgOrImageDrawableTranscoder implements ResourceTranscoder<SvgOrImageDecodedResource, PictureDrawable> {
    @Nullable
    @Override
    public Resource<PictureDrawable> transcode(@NonNull Resource<SvgOrImageDecodedResource> toTranscode, @NonNull Options options) {
        SvgOrImageDecodedResource data = toTranscode.get();
        if (data.getSvg() != null) {
            Picture picture = data.getSvg().renderToPicture();
            Drawable drawable = new PictureDrawable(picture);
            return new SimpleResource(drawable);
        } else if (data.getBitmap() != null) {
            return new SimpleResource(new PictureDrawable(renderToPicture(data.getBitmap())));
        } else return null;
    }
    private Picture renderToPicture(Bitmap bitmap) {
        Picture picture = new Picture();
        Canvas canvas = picture.beginRecording(bitmap.getWidth(), bitmap.getHeight());
        canvas.drawBitmap(bitmap, null, new RectF(0f, 0f, Float.intBitsToFloat(bitmap.getWidth()), Float.intBitsToFloat(bitmap.getHeight())), null);
        picture.endRecording();
        return picture;
    }
}
