package com.mario.myapplication.util;

import android.graphics.Bitmap;

import com.caverock.androidsvg.SVG;

public class SvgOrImageDecodedResource {
    SVG svg;
    Bitmap bitmap;

    public SvgOrImageDecodedResource(SVG svg, Bitmap bitmap) {
        this.svg = svg;
        this.bitmap = bitmap;
    }

    public SvgOrImageDecodedResource() {
    }

    public SVG getSvg() {
        return svg;
    }

    public void setSvg(SVG svg) {
        this.svg = svg;
    }

    public Bitmap getBitmap() {
        return bitmap;
    }

    public void setBitmap(Bitmap bitmap) {
        this.bitmap = bitmap;
    }
}
