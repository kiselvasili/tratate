let gulp = require('gulp');
let shell = require('gulp-shell');

gulp.task('install', () => {
    process.chdir('backend');
    gulp.src('')
        .pipe(shell('npm install'));
    process.chdir('../frontend');
    gulp.src('')
        .pipe(shell('npm install'));
});

gulp.task('default', () => {
    process.chdir('backend');
    gulp.src('')
        .pipe(shell('npm start'));
    process.chdir('../frontend');
    gulp.src('')
        .pipe(shell('npm start'));
});