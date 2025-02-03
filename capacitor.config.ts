import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kevinjojo.portfolio',
  appName: 'Kevin Jojo Portfolio',
  webDir: 'dist',
  server: {
    url: 'https://your-project-id.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: '#0A0A0B'
  }
};

export default config;