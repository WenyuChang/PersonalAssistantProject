package com.demo.pa;

import com.phonegap.*;
import android.os.Bundle;

public class PersonalAssistantActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        
        //super.loadUrl("file:///android_asset/www/assistant/index.html");
        super.loadUrl("file:///android_asset/www/pa/index.html");
    }
}