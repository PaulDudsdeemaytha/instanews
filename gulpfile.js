var gulp = require('gulp'), // Load gulp first!
    uglify = require('gulp-uglify'), 
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyError = require('gulp-prettyerror'),
    pump = require('pump');   
    babel = require('gulp-babel');


// gulp babel task
var input = 'js/*.js';
var output = 'js/transpiled';
gulp.task('babel', function(){
  return gulp.src(input)
    .pipe(babel())
    .pipe(gulp.dest(output))
});


//gulp task for sass
gulp.task('sass', function(){
  return gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(prettyError())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

//Link task for the JS
gulp.task('lint', function() {
  return gulp.src(['./js/transpiled/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

//script task to minify, rename and put in build folder    
gulp.task('scripts', gulp.series('lint', function(){
  return gulp.src('./js/transpiled/*.js')
    .pipe(uglify()) //call uglify function on files
    .pipe(rename({ extname: '.min.js' })) //rename the ugly file
    .pipe(gulp.dest('./build/js'));
}));

//gulp watch task
gulp.task('watch', function(){
  gulp.watch('scss/*.scss', gulp.series('sass'));
  gulp.watch('js/*.js', gulp.series(['babel', 'scripts']));
});

//gulp browser sync task
gulp.task('browser-sync', function() {
  browserSync.init({
     server: {
        baseDir: './'
     }
  });

  gulp.watch(['*.html','build/css/*.css','./build/js/*.js']).on('change', browserSync.reload);
});


//default function that can reference multiple named tasks
 gulp.task('default', gulp.parallel('watch', 'browser-sync'));

