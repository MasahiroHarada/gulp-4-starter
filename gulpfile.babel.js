import { series, parallel, watch } from 'gulp';

import { reload, serve } from './tasks/server';
import { styles } from './tasks/styles';
import { scripts } from './tasks/scripts';
import { templates } from './tasks/templates';
import { images } from './tasks/images';
import { clean } from './tasks/clean';

import {
  sass as sassConfig,
  scripts as jsConfig,
  images as imagesConfig,
  templates as templatesConfig
} from './tasks/config';

/**
 * ファイルの変更を監視
 */
function watchFiles() {
  // Sass
  watch(sassConfig.src, series(styles, reload));
  // Templates
  watch(
    [templatesConfig.edges, templatesConfig.data, templatesConfig.helper],
    series(templates, reload)
  );
  // JavaScript
  watch(jsConfig.src, series(scripts, reload));
  // Images
  watch(imagesConfig.src, series(images, reload));
}

/**
 * 開発用ビルド
 */
export const dev = series(
  clean,
  parallel(styles, templates, scripts, images),
  serve,
  watchFiles
);

/**
 * 本番用ビルド
 */
export const build = series(
  clean,
  parallel(styles, templates, scripts, images)
);
