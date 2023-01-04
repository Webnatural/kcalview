module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanOCR'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@kcalview/*': './',
          '@components/*': './src/components',
          '@navstack/*': './src/components/navstack',
          '@shared/*': './src/components/shared',
          '@screens/*': './src/components/screens',
          '@/*': './',
        },
      },
    ],
  ],
};
