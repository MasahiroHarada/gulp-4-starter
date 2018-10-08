import gulp from 'gulp';
import babel from 'gulp-babel';
import gulpIf from 'gulp-if';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import gulpEslint from 'gulp-eslint';

import { scripts as config, isProd } from './config';

export function esTranspile() {
  return gulp
    .src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel(config.babelrc))
    .pipe(gulpIf(isProd, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
}

export function esLint() {
  return gulp
    .src(config.src)
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpIf(isProd, gulpEslint.failAfterError()));
}

export const scripts = gulp.series(esLint, esTranspile);
