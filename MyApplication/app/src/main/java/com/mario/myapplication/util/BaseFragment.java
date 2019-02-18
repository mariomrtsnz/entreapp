package com.mario.myapplication.util;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.util.ArrayList;
import java.util.List;

public abstract class BaseFragment extends Fragment {
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        new ToolbarManager(builder(), view).prepareToolbar();
    }

    protected abstract FragmentToolbar builder();

    public static class Builder {
        private int resId = -1;
        private int menuId = -1;
        private int title = -1;
        private List<Integer> menuItems = new ArrayList<>();
        private List<MenuItem.OnMenuItemClickListener> menuClicks = new ArrayList<>();

        public Builder() {
        }

        public Builder withId(int resId) {
            this.resId = resId;
            return this;
        }

        public Builder withTitle(int title) {
            this.title = title;
            return this;
        }

        public Builder withMenu(int menuId) {
            this.menuId = menuId;
            return this;
        }

        public Builder withMenuItems(List<Integer> menuItems, List<MenuItem.OnMenuItemClickListener> menuClicks) {
            this.menuItems.addAll(menuItems);
            this.menuClicks.addAll(menuClicks);
            return this;
        }

        public FragmentToolbar build() {
            return new FragmentToolbar(resId, title, menuId, menuItems, (MenuItem.OnMenuItemClickListener[]) menuClicks.toArray());
        }
    }

}
