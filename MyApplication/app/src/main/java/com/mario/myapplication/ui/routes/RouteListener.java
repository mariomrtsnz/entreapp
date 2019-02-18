package com.mario.myapplication.ui.routes;

import android.view.View;

import com.mario.myapplication.responses.RouteResponse;

public interface RouteListener {
    void onRouteClick(View v, RouteResponse r);
}
