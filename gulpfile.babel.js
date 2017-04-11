import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

const paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'lib',
  },
};

export const clean = () => del(['lib']);

export const compile =
  () =>
    gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest))
;

export const build = gulp.series(clean, compile);
