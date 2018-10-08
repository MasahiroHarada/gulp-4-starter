import gulp from 'gulp';
import babel from 'gulp-babel';
import gulpIf from 'gulp-if';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

import { scripts as config } from './config';

const isProd = process.env.NODE_ENV === 'production';

export function scripts() {
  return gulp
    .src(config.src)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel(config.babelrc))
    .pipe(gulpIf(isProd, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
}
