var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var prettyError = require ('gulp-prettyerror')
// const gulp = require('gulp');
// const eslint = require('gulp-eslint');
gulp.task('sass', function (){
    return gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(prettyError()) 
    .pipe(
        autoprefixer( {
            browsers: ('last 2 versions')
        })
    )
    .pipe (gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

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
    gulp.watch('./scss/*.scss', gulp.series('sass'));
    gulp.watch('index.js', gulp.series('scripts'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

 
gulp.watch(['*.html','build/css/*.css','build/js/*.js']).on('change', browserSync.reload);


gulp.task('default', gulp.parallel('watch', 'browser-sync'))

// function defaultTask(done) {
//   // place code for your default task here
//   done();
// }