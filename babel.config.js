module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './',
          '@/*': './*',
          '@kcalview': './',
          '@kcalview/*': './*',
          '@components': './src/components',
          '@components/*': './src/components/*',
          '@navstack': './src/components/navstack',
          '@navstack/*': './src/components/navstack/*',
          '@screens': './src/components/screens',
          '@screens/*': './src/components/screens/*',
          '@shared': './src/components/shared',
          '@shared/*': './src/components/shared/*',
          '@store': './src/store',
          '@store/*': './src/store/*',
        },
      },
    ],
  ],
};
