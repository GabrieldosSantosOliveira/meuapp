module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        alias: {
          '@/app': './src/app',
          '@/helpers': './src/helpers',
          '@/infra': './src/infra',
          '@/interface': './src/interface',
          '@/main': './src/main',
          '@/test': './test',
          '@/validations': './src/validations',
          '@/utils': './src/utils',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
