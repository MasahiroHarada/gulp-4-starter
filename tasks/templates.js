import gulp from 'gulp';
import edge from 'edge.js';
import tap from 'gulp-tap';
import rename from 'gulp-rename';
import fs from 'fs';
import path from 'path';

import { templates as config } from './config';

/**
 * Edge.js -> HTML
 */
export function templates() {
  // テンプレートを読み込む
  edge.registerViews(path.join(__dirname, `../${config.root}`));

  // データファイルを読み込む
  const data = fs.existsSync(config.data)
    ? JSON.parse(fs.readFileSync(config.data, 'utf8'))
    : {};

  // ヘルパー関数を読み込む
  fs.existsSync(config.helpers) && require(`../${config.helper}`);

  return gulp
    .src(config.pages)
    .pipe(
      tap(file => {
        const contents = edge.renderString(String(file.contents), data);
        file.contents = new Buffer(contents);
      })
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(config.dest));
}
