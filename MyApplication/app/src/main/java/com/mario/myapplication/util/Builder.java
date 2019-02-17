package com.mario.myapplication.util;

import android.view.MenuItem;

import java.util.ArrayList;
import java.util.List;

public class Builder {
    private int resId = -1;
    private int menuId = -1;
    private int title = -1;
    private List<Integer> menuItems = new ArrayList<>();
    private List<MenuItem.OnMenuItemClickListener> menuClicks = new ArrayList<>();

    public Builder() {
    }

    public void withId(int resId) {
        this.resId = resId;
    }

    public void withTitle(int title) {
        this.title = title;
    }

    public void withMenu(int menuId) {
        this.menuId = menuId;
    }

    public void withMenuItems(List<Integer> menuItems, List<MenuItem.OnMenuItemClickListener> menuClicks) {
        this.menuItems.addAll(menuItems);
        this.menuClicks.addAll(menuClicks);
    }

    public void build() {
        new FragmentToolbar(resId, title, menuId, menuItems, (MenuItem.OnMenuItemClickListener[]) menuClicks.toArray());
    }
}
