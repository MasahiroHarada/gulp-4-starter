import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'gulp-cssnano';
import plumber from 'gulp-plumber';

import { sass as config } from './config';

/**
 * SCSS -> CSS
 */
export function styles() {
  return gulp
    .src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
}
