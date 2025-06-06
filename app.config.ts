import { ExpoConfig } from '@expo/config-types'

export default (): ExpoConfig => ({
  name: 'moodlog',
  slug: 'moodlog',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kidboi666.moodlog',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.kidboi666.moodlog',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/icon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    'expo-localization',
    'expo-sqlite',
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme:
          'com.googleusercontent.apps.275212970386-2ib0j1tkgjb1jmugnp7cefh3qhntp8q9',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: '1dcbc0cb-0ee7-40f3-901b-69323e720822',
    },
  },
})
