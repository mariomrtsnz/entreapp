package com.mario.myapplication.ui.pois;


import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.tasks.Task;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.mario.myapplication.R;

import java.util.Objects;

import static android.content.Context.LOCATION_SERVICE;


public class MapPoiFragment extends Fragment implements OnMapReadyCallback {


    private static final int DEFAULT_ZOOM = 15;
    private static final String KEY_LOCATION = "location";
    private static final int PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION = 1;
    private final LatLng mDefaultLocation = new LatLng(37.3866245, -5.9942548);
    private GoogleMap mMap;
    private FusedLocationProviderClient mFusedLocationProviderClient;
    private boolean mLocationPermissionGranted;
    private Location mLastKnownLocation;


    public MapPoiFragment() {
        setRetainInstance(true);
    }

    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        if (mMap != null) {
            outState.putParcelable(KEY_LOCATION, mLastKnownLocation);
            super.onSaveInstanceState(outState);
        }
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (savedInstanceState == null) {
            getLocationPermissions();
        } else {
            mLastKnownLocation = savedInstanceState.getParcelable(KEY_LOCATION);
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        if (savedInstanceState == null) {
            checkDeviceLocation();
        }

        View v = inflater.inflate(R.layout.fragment_map_poi, container, false);

        v.findViewById(R.id.showMyLoc).setOnClickListener(view -> {
            if (checkDeviceLocation()) getDeviceLocation();
            else enableDeviceLocation();
        });

        mFusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(Objects.requireNonNull(getContext()));
        ((SupportMapFragment) Objects.requireNonNull(getChildFragmentManager().findFragmentById(R.id.map))).getMapAsync(this);

        return v;
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        mMap.getUiSettings().setMyLocationButtonEnabled(false);
        getDeviceLocation();
    }

    private void getLocationPermissions() {
        if (ContextCompat.checkSelfPermission(Objects.requireNonNull(getContext()),
                android.Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            mLocationPermissionGranted = true;
        } else {
            ActivityCompat.requestPermissions(Objects.requireNonNull(this.getActivity()),
                    new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION},
                    PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION);
        }

    }

    private boolean checkDeviceLocation() {
        LocationManager service = (LocationManager) getContext().getSystemService(LOCATION_SERVICE);
        return service.isProviderEnabled(LocationManager.GPS_PROVIDER);
    }

    private void enableDeviceLocation() {
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(getContext());
        alertDialogBuilder.setTitle(R.string.need_gps_title)
                .setMessage(R.string.need_gps_message)
                .setPositiveButton(R.string.accept, (dialog, which) -> startActivity(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS)))
                .setNegativeButton(R.string.cancel, (dialog, which) -> dialog.dismiss())
                .show();
    }

    private void getDeviceLocation() {
        try {
            if (mLocationPermissionGranted) {
                Task<Location> locationResult = mFusedLocationProviderClient.getLastLocation();
                locationResult.addOnCompleteListener(Objects.requireNonNull(this.getActivity()), task -> {
                    if (task.getResult() != null) {
                        mMap.setMyLocationEnabled(true);
                        mLastKnownLocation = task.getResult();
                        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(
                                new LatLng(mLastKnownLocation.getLatitude(),
                                        mLastKnownLocation.getLongitude()), DEFAULT_ZOOM));
                    } else if (mLastKnownLocation != null) {
                        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(
                                new LatLng(mLastKnownLocation.getLatitude(),
                                        mLastKnownLocation.getLongitude()), DEFAULT_ZOOM));
                        mMap.getUiSettings().setMyLocationButtonEnabled(false);
                    } else {
                        mMap.setMyLocationEnabled(false);
                        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(mDefaultLocation, DEFAULT_ZOOM));
                        mMap.getUiSettings().setMyLocationButtonEnabled(false);
                    }
                });
            } else if (mLastKnownLocation != null) {
                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(
                        new LatLng(mLastKnownLocation.getLatitude(),
                                mLastKnownLocation.getLongitude()), DEFAULT_ZOOM));
                mMap.getUiSettings().setMyLocationButtonEnabled(false);
            } else {
                mMap.setMyLocationEnabled(false);
                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(mDefaultLocation, DEFAULT_ZOOM));
                mMap.getUiSettings().setMyLocationButtonEnabled(false);
            }
        } catch (SecurityException e) {
            Log.e("Exception: %s", e.getMessage());
        }
    }


    //    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        if (savedInstanceState != null) {
//            mLastKnownLocation = savedInstanceState.getParcelable(KEY_LOCATION);
//        } else {
//            activateDeviceLocation();
//        }
//    }
//
//    @Override
//    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
//                             Bundle savedInstanceState) {
//        View v = inflater.inflate(R.layout.fragment_map_poi, container, false);
//
//
//        // Construct a FusedLocationProviderClient.
//        mFusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(Objects.requireNonNull(getContext()));
//
//
//        SupportMapFragment mapFragment = (SupportMapFragment) getChildFragmentManager()
//                .findFragmentById(R.id.map);
//        Objects.requireNonNull(mapFragment).getMapAsync(this);
//
//        return v;
//    }
//
//    @Override
//    public void onSaveInstanceState(@NonNull Bundle outState) {
//        if (mMap != null) {
//            outState.putParcelable(KEY_LOCATION, mLastKnownLocation);
//            super.onSaveInstanceState(outState);
//        }
//    }
//
//    @Override
//    public void onMapReady(GoogleMap googleMap) {
//
//        mMap = googleMap;
//        // Use a custom info window adapter to handle multiple lines of text in the
//        // info window contents.
//        mMap.setInfoWindowAdapter(new GoogleMap.InfoWindowAdapter() {
//
//            @Override
//            public View getInfoWindow(Marker arg0) {
//                return null;
//            }
//
//            @Override
//            public View getInfoContents(Marker marker) {
//                return null;
//            }
//
//        });
//
//        // Prompt the user for permission.
//        getLocationPermission();
//
//        // Turn on the My Location layer and the related control on the map.
//        updateLocationUI();
//
//        // Get the current location of the device and set the position of the map.
//        getDeviceLocation();
//    }
//
//    private void activateDeviceLocation() {
//        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(getContext());
//        alertDialogBuilder
//                .setTitle(R.string.need_gps_title)
//                .setMessage(R.string.need_gps_message)
//                .setPositiveButton(R.string.accept, (dialog, which) ->
//                        startActivity(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS)))
//                .setNegativeButton(R.string.cancel, ((dialog, which) -> dialog.cancel()))
//                .create().show();
//    }
//
//    private void getDeviceLocation() {
//        try {
//            if (mLocationPermissionGranted) {
//                Task<Location> locationResult = mFusedLocationProviderClient.getLastLocation();
//                locationResult.addOnCompleteListener(Objects.requireNonNull(this.getActivity()), task -> {
//                    if (task.getResult() != null) {
//                        mLastKnownLocation = task.getResult();
//                        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(
//                                new LatLng(mLastKnownLocation.getLatitude(),
//                                        mLastKnownLocation.getLongitude()), DEFAULT_ZOOM));
//                    } else {
//                        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(mDefaultLocation, DEFAULT_ZOOM));
//                        mMap.getUiSettings().setMyLocationButtonEnabled(false);
//                    }
//                });
//            }
//        } catch (SecurityException e) {
//            Log.e("Exception: %s", e.getMessage());
//        }
//    }
//
//    private void getLocationPermission() {
//        /*
//         * Request location permission, so that we can get the location of the
//         * device. The result of the permission request is handled by a callback,
//         * onRequestPermissionsResult.
//         */
//        if (ContextCompat.checkSelfPermission(Objects.requireNonNull(getContext()),
//                android.Manifest.permission.ACCESS_FINE_LOCATION)
//                == PackageManager.PERMISSION_GRANTED) {
//            mLocationPermissionGranted = true;
//        } else {
//            ActivityCompat.requestPermissions(Objects.requireNonNull(this.getActivity()),
//                    new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION},
//                    PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION);
//        }
//    }
//
//    @Override
//    public void onRequestPermissionsResult(int requestCode,
//                                           @NonNull String[] permissions,
//                                           @NonNull int[] grantResults) {
//        mLocationPermissionGranted = false;
//        // If request is cancelled, the result arrays are empty.
//        if (requestCode == PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION) {
//            if (grantResults.length > 0
//                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                mLocationPermissionGranted = true;
//            }
//        }
//        updateLocationUI();
//    }
//
//    private void updateLocationUI() {
//        if (mMap == null) {
//            return;
//        }
//        try {
//            if (mLocationPermissionGranted) {
//                mMap.setMyLocationEnabled(true);
//                mMap.getUiSettings().setMyLocationButtonEnabled(true);
//            } else {
////                mMap.setMyLocationEnabled(false);
//                mMap.getUiSettings().setMyLocationButtonEnabled(false);
//                mLastKnownLocation = null;
//                getLocationPermission();
//            }
//        } catch (SecurityException e) {
//            Log.e("Exception: %s", e.getMessage());
//        }
//    }


}
