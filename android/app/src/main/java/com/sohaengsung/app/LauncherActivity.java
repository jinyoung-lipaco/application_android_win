package com.sohaengsung.app;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.browser.customtabs.CustomTabsIntent;
import androidx.browser.customtabs.CustomTabsService;
import androidx.browser.trusted.TrustedWebActivityIntentBuilder;

import java.util.List;

public class LauncherActivity extends Activity {

    private static final String TAG = "TWALauncher";
    // Default: GitHub Pages. Override with BuildConfig for Docker backend.
    // For local Docker: "http://<your-pc-ip>:4000/prototype.html"
    private static final String TARGET_URL = BuildConfig.DEFAULT_URL;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
            // Try Custom Tabs first (works even without full TWA support)
            String chromePackage = findCustomTabsProvider();

            if (chromePackage != null) {
                // Launch with Custom Tabs
                CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
                builder.setShowTitle(false);
                builder.setUrlBarHidingEnabled(true);
                CustomTabsIntent customTabsIntent = builder.build();
                customTabsIntent.intent.setPackage(chromePackage);
                customTabsIntent.launchUrl(this, Uri.parse(TARGET_URL));
            } else {
                // Fallback: open in any browser
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(TARGET_URL));
                startActivity(browserIntent);
            }
        } catch (Exception e) {
            Log.e(TAG, "Failed to launch TWA", e);
            // Ultimate fallback
            try {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(TARGET_URL));
                startActivity(browserIntent);
            } catch (Exception e2) {
                Log.e(TAG, "Failed to open browser", e2);
            }
        }

        finish();
    }

    private String findCustomTabsProvider() {
        PackageManager pm = getPackageManager();
        Intent serviceIntent = new Intent();
        serviceIntent.setAction(CustomTabsService.ACTION_CUSTOM_TABS_CONNECTION);

        List<ResolveInfo> resolveInfos = pm.queryIntentServices(serviceIntent, 0);
        if (resolveInfos != null && !resolveInfos.isEmpty()) {
            // Prefer Chrome
            for (ResolveInfo info : resolveInfos) {
                if ("com.android.chrome".equals(info.serviceInfo.packageName)) {
                    return "com.android.chrome";
                }
            }
            // Return first available
            return resolveInfos.get(0).serviceInfo.packageName;
        }
        return null;
    }
}
