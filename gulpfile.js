var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
// const gulp = require('gulp');
// const eslint = require('gulp-eslint');

// Link task for JS
gulp.task('lint', function(){
    return gulp.src('index.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('scripts', gulp.series('lint', function(){
    return gulp.src('index.js')
    .pipe(uglify()) // call uglify function on files
    .pipe(rename({extname:'.min.js'})) //rename the now ugly file
    .pipe(gulp.dest('./build/js'));
}));

gulp.task('watch', function(){
    gulp.watch('index.js', gulp.parallel('scripts'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

 
gulp.watch('build/js/*.js').on('change', browserSync.reload);

gulp.task('default', gulp.parallel('watch', 'browser-sync'))

// function defaultTask(done) {
//   // place code for your default task here
//   done();
// }