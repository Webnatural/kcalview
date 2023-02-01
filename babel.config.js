module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@kcalview': './',
          '@kcalview/*': './*',
          '@components': './src/components',
          '@components/*': './src/components/*',
          '@navstack': './src/components/navstack',
          '@navstack/*': './src/components/navstack/*',
          '@screens': './src/components/screens',
          '@screens/*': './src/components/screens/*',
          '@shared': './src/shared',
          '@shared/*': './src/shared/*',
          '@store': './src/store',
          '@store/*': './src/store/*',
          '@db': './src/database',
          '@db/*': './src/database/*',
        },
      },
    ],
  ],
};
