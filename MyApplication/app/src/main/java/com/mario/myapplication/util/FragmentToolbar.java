package com.mario.myapplication.util;

import android.view.MenuItem;

import java.util.ArrayList;
import java.util.List;

public class FragmentToolbar {
    int resId;
    int title;
    int menuId;
    List<Integer> menuItems;
    List<MenuItem.OnMenuItemClickListener> menuClicks;
    static int NO_TOOLBAR = -1;

    public FragmentToolbar(int resId, int title, int menuId, List<Integer> menuItems, List<MenuItem.OnMenuItemClickListener> menuClicks) {
        this.resId = resId;
        this.title = title;
        this.menuId = menuId;
        this.menuItems = menuItems;
        this.menuClicks = menuClicks;
    }

    public int getResId() {
        return resId;
    }

    public void setResId(int resId) {
        this.resId = resId;
    }

    public int getTitle() {
        return title;
    }

    public void setTitle(int title) {
        this.title = title;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public List<Integer> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<Integer> menuItems) {
        this.menuItems = menuItems;
    }

    public List<MenuItem.OnMenuItemClickListener> getMenuClicks() {
        return menuClicks;
    }

    public void setMenuClicks(List<MenuItem.OnMenuItemClickListener> menuClicks) {
        this.menuClicks = menuClicks;
    }

    public static int getNoToolbar() {
        return NO_TOOLBAR;
    }

    public static void setNoToolbar(int noToolbar) {
        NO_TOOLBAR = noToolbar;
    }
}

class Builder {
    private int resId = -1;
    private int menuId = -1;
    private int title = -1;
    private List<Integer> menuItems = new ArrayList<>();
    private List<MenuItem.OnMenuItemClickListener> menuClicks = new ArrayList<>();

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
        new FragmentToolbar(resId, title, menuId, menuItems, menuClicks);
    }
}