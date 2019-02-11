package com.mario.myapplication.util;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.load.Options;
import com.bumptech.glide.load.ResourceDecoder;
import com.bumptech.glide.load.engine.Resource;
import com.bumptech.glide.load.resource.SimpleResource;
import com.caverock.androidsvg.SVG;
import com.caverock.androidsvg.SVGParseException;

import java.io.ByteArrayInputStream;
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
        byte[] array = new byte[source.available()];
        source.read(array);
        ByteArrayInputStream svgInputStream = new ByteArrayInputStream(array.clone());
        ByteArrayInputStream pngInputStream = new ByteArrayInputStream(array.clone());
        SvgOrImageDecodedResource svgOrImageDecodedResource = new SvgOrImageDecodedResource();
        try {
            SVG svg = SVG.getFromInputStream(svgInputStream);
            try {
                source.close();
                pngInputStream.close();
            } catch (IOException e) {

            }
            svgOrImageDecodedResource.setSvg(svg);
            return new SimpleResource(svgOrImageDecodedResource);
        } catch (SVGParseException ex) {
            try {
                Bitmap bitmap = BitmapFactory.decodeStream(pngInputStream);
                svgOrImageDecodedResource.setBitmap(bitmap);
                return new SimpleResource(svgOrImageDecodedResource);
            } catch (Exception exception) {
                try {
                    source.close();
                    pngInputStream.close();
                } catch (IOException ioEx) {

                }
                throw new IOException("Cannot load SVG or Image from stream", ex);
            }
        }
    }
}
