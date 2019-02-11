package com.mario.myapplication.ui.common;

import android.os.Bundle;

import com.google.android.material.bottomnavigation.BottomNavigationView;
//import com.mario.myapplication.PoiFragment;
import com.mario.myapplication.R;

import androidx.appcompat.app.AppCompatActivity;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.MenuItem;
import android.widget.TextView;

public class DashboardActivity extends AppCompatActivity {
    private TextView mTextMessage;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            Fragment f = null;
            switch (item.getItemId()) {

                case R.id.navigation_pois:
                    //f = new PoiFragment();

                    break;
                case R.id.navigation_routes:
                    break;
                case R.id.navigation_people:
                    break;
                case R.id.navigation_badges:
                    break;
                case R.id.navigation_my_profile:
                    break;
            }
            if (f != null) {
                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.contenedor, f)
                        .commit();
                return true;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        BottomNavigationView navView = findViewById(R.id.nav_view);
        mTextMessage = findViewById(R.id.message);
        navView.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        /*getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.contenedor, new PoiFragment())
                .commit();*/
    }

}
