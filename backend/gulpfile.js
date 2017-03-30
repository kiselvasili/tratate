let gulp = require('gulp');
let logger = require('winston');
let spawn = require('child_process').spawn;
let node;

gulp.task('start', () => {
    if (node) {
        node.kill()
    }
    node = spawn('node', ['index.js'], { stdio: 'inherit'});
});

gulp.task('stop', () => {
    if (node) node.kill();
});

gulp.task('default', ['stop'], () => {
    gulp.start('start');
});