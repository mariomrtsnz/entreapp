package com.mario.myapplication.util;

import android.view.View;
import android.widget.Toolbar;

public class ToolbarManager {
    private FragmentToolbar builder;
    private View container;

    public ToolbarManager(FragmentToolbar builder, View container) {
        this.builder = builder;
        this.container = container;
    }

    public void prepareToolbar() {
        if (builder.getResId() != FragmentToolbar.NO_TOOLBAR) {
            Toolbar fragmentToolbar = container.findViewById(builder.resId);
        }
    }
}
