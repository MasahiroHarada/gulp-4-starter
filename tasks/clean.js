import del from 'del';

/**
 * 出力先のディレクトリを空にする
 */
export function clean() {
  return del(['public']);
}
