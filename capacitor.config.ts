import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.noa.wellness',
  appName: 'Noa',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;