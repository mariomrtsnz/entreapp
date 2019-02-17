package com.mario.myapplication.util;

import android.view.Menu;
import android.view.MenuItem;
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
        if (builder.resId != FragmentToolbar.NO_TOOLBAR) {
            Toolbar fragmentToolbar = container.findViewById(builder.resId);

            if (builder.title != -1) {
                fragmentToolbar.setTitle(builder.getTitle());
            }

            if (builder.menuId != -1) {
                fragmentToolbar.inflateMenu(builder.menuId);
            }

            if (!builder.menuItems.isEmpty() && builder.menuClicks.length != 0) {
                Menu menu = fragmentToolbar.getMenu();
                int index = 0;
                for (int menuItemId : builder.menuItems) {
                    MenuItem menuItem = menu.findItem(menuItemId);
                    menuItem.setOnMenuItemClickListener(builder.menuClicks[index]);
                    index++;
                }
            }
        }
    }
}
