module.exports = api => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['inline-import', { extensions: ['.sql'] }],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
