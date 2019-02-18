package com.mario.myapplication.ui.common;

import android.net.Uri;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.mario.myapplication.R;
import com.mario.myapplication.responses.BadgeResponse;
import com.mario.myapplication.responses.CategoryResponse;
import com.mario.myapplication.responses.PeopleResponse;
import com.mario.myapplication.responses.RouteResponse;
import com.mario.myapplication.responses.UserResponse;
import com.mario.myapplication.ui.badges.BadgeListener;
import com.mario.myapplication.ui.badges.BadgesFragment;
import com.mario.myapplication.ui.badges.detail.BadgeDetailFragment;
import com.mario.myapplication.ui.categories.CategoryFragment;
import com.mario.myapplication.ui.people.PeopleFragment;
import com.mario.myapplication.ui.people.details.PeopleDetailsFragment;
import com.mario.myapplication.ui.pois.PoiMapFragment;
import com.mario.myapplication.ui.pois.list.PoiListFragment;
import com.mario.myapplication.ui.pois.list.PoiListListener;
import com.mario.myapplication.ui.profile.MyProfileFragment;
import com.mario.myapplication.ui.routes.RouteListener;
import com.mario.myapplication.ui.routes.RoutesFragment;

//import com.mario.myapplication.PoiFragment;

public class DashboardActivity extends AppCompatActivity implements CategoryFragment.OnListFragmentCategoryInteractionListener, BadgeListener, RouteListener, PeopleFragment.OnListFragmentUserInteractionListener, PoiListListener, PeopleDetailsFragment.OnFragmentInteractionListener {
    FragmentTransaction fragmentChanger;
    private Fragment badges, pois, myProfile, people, routes;
    private TextView mTextMessage;
    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            Fragment f = null;
            switch (item.getItemId()) {

                case R.id.navigation_pois:
                    fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, pois);
                    fragmentChanger.commit();
                    return true;
                case R.id.navigation_routes:
                    fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, routes);
                    fragmentChanger.commit();
                    break;
                case R.id.navigation_people:
                    fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, people);
                    fragmentChanger.commit();
                    break;
                case R.id.navigation_badges:
                    fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, badges);
                    fragmentChanger.commit();
                    return true;
                case R.id.navigation_my_profile:
                    fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, myProfile);
                    fragmentChanger.commit();
                    return true;

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
        pois = new PoiMapFragment();
        people = new PeopleFragment();
        myProfile = new MyProfileFragment();
        routes = new RoutesFragment();
        // Para que por defecto cargue el fragmento de POIs (general)
        fragmentChanger = getSupportFragmentManager().beginTransaction().replace(R.id.contenedor, pois);
        fragmentChanger.commit();
    }

    @Override
    public void onListFragmentCategoryInteraction(CategoryResponse item) {

    }

    @Override
    public void onBadgeClick(View v, BadgeResponse b) {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.contenedor, new BadgeDetailFragment(b.getId()))
                .commit();
    }

    @Override
    public void onRouteClick(View v, RouteResponse r) {

    }

    /*public void clickOnCamera() {
        Toast.makeText(this, "CLICK ON CAMERA", Toast.LENGTH_LONG).show();


    }

    @Override
    public void editUser(MyProfileResponse u) {
        Toast.makeText(this, "CLICK ON EDIT USER", Toast.LENGTH_LONG).show();

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor, new MyProfileEdit())
                .commit();


    }*/

    @Override
    public void onListFragmentUserInteraction(PeopleResponse item) {

    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
