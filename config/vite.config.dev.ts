import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';
import createSvgIcon from './plugin/svg-icon';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      // proxy: {
      //   '/analysisWeb': {
      //     target: 'http://192.168.0.24:8011/analysisWeb',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/analysisWeb/, ''),
      //   },
      // },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
      createSvgIcon(false),
    ],
  },
  baseConfig
);
