import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'gulp-cssnano';
import plumber from 'gulp-plumber';
import gulpStylelint from 'gulp-stylelint';

import { sass as config, isProd } from './config';

/**
 * SCSS -> CSS
 */
export function sass() {
  return gulp
    .src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
}

/**
 * Stylelint
 */
export function stylelint() {
  return gulp.src(config.src).pipe(
    gulpStylelint({
      failAfterError: isProd,
      reporters: [{ formatter: 'verbose', console: true }],
      syntax: 'scss'
    })
  );
}

export const styles = gulp.series(stylelint, sass);
