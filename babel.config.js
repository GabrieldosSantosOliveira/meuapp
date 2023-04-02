module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '16',
        },
      },
    ],
  ],
  plugins: [
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
