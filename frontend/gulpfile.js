let gulp = require('gulp');
let gulpif = require('gulp-if');
let args = require('yargs').argv;
let typescript = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let del = require('del');
let tsconfig = typescript.createProject('tsconfig.json');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let tslint = require('gulp-tslint');
let browserSync = require('browser-sync');

gulp.task('tslint', function() {
    return gulp.src('./src/**/*.ts')
        .pipe(tslint({
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report());
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    });
});

gulp.task('build-ts',  ['tslint'],  function () {
    return gulp.src('./src/**/*.ts')
        .pipe(gulpif(!args.production, sourcemaps.init()))
        .pipe(typescript(tsconfig))
        .pipe(gulpif(!args.production, sourcemaps.write()))
        .pipe(gulp.dest('././js'));
});

gulp.task('libs', function() {
    gulp.src('./node_modules/@angular/**')
        .pipe(gulp.dest('./libs/@angular'));

    gulp.src('./node_modules/core-js/**')
        .pipe(gulp.dest('./libs/core-js/'));

    gulp.src('./node_modules/reflect-metadata/**')
        .pipe(gulp.dest('./libs/reflect-metadata/'));

    gulp.src('./node_modules/rxjs/**')
        .pipe(gulp.dest('./libs/rxjs/'));

    return gulp.src('./node_modules/zone.js/**')
        .pipe(gulp.dest('./libs/zone.js/'));
});

gulp.task('scripts', ['build-ts'], function() {
    return browserify('./js/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('././js'));
});

gulp.task('clean', function() {
    del('./libs');
});

//Watching task
gulp.task('watch', ['browser-sync','scripts'], function() {
    gulp.watch('./src/**/*.ts', ['scripts']);
    gulp.watch('./js/bundle.js', browserSync.reload);
    gulp.watch('./**/*.{html,css}', browserSync.reload);
    gulp.watch('./*.html', browserSync.reload);
});

gulp.task('build', ['libs', 'scripts']);

gulp.task('default', ['watch']);