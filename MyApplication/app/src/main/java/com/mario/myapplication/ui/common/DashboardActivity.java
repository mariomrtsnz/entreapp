package com.mario.myapplication.ui.common;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.mario.myapplication.R;
<<<<<<< HEAD
import com.mario.myapplication.ui.badges.BadgesFragment;
=======
>>>>>>> d3c1e2bedff7b9d98d14865bd9b185b6dd5b555d
import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.ui.badges.BadgesFragment;
import com.mario.myapplication.ui.categories.CategoryFragment;

//import com.mario.myapplication.PoiFragment;

public class DashboardActivity extends AppCompatActivity implements CategoryFragment.OnListFragmentCategoryInteractionListener {
    FragmentTransaction fragmentChanger;
<<<<<<< HEAD
    private Fragment badges, pois;
=======
    private TextView mTextMessage;
    private Fragment badges;
>>>>>>> d3c1e2bedff7b9d98d14865bd9b185b6dd5b555d
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
                    fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, badges);
                    fragmentChanger.commit();
                    return true;
                case R.id.navigation_my_profile:
                    f = new CategoryFragment();
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
        badges = new BadgesFragment();
        // Para que por defecto cargue el fragmento de POIs (general)
        fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, pois);
        fragmentChanger.commit();

        /*getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.contenedor, new PoiFragment())
                .commit();*/
    }

    @Override
    public void onListFragmentCategoryInteraction(CategoryResponse item) {

    }
}
