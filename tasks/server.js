import browserSync from 'browser-sync';

const server = browserSync.create();

/**
 * 開発用サーバ再起動
 */
export function reload(cb) {
  server.reload();
  cb();
}

/**
 * 開発用サーバ起動
 */
export function serve(cb) {
  server.init({
    server: {
      baseDir: './public'
    }
  });
  cb();
}
