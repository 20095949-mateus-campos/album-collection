import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Album Collection',
  webDir: 'dist',
  plugins: {
    android: {
      // Tells Capacitor to automatically adjust the layout for edge-to-edge
      adjustMarginsForEdgeToEdge: 'auto' 
    },
    StatusBar: {
      style: 'DARK', // Makes status bar text/icons light for your dark background
      backgroundColor: '#1E1E1E', // Matches your dark theme background
      overlaysWebView: false,
    },
    SplashScreen: {
      backgroundColor: "#1E1E1E", // Background color for Android 11 and below
      androidSplashResourceName: 'splash_background',
    },
  }
};

export default config;
