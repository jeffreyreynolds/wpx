var gulp = require('gulp');

//requiring the gulp-sass plugin
var sass = require('gulp-sass');

//requiring browser sync
var browserSync = require('browser-sync').create();

//useref to concatenate the js files
var useref = require('gulp-useref');

//for uglify to min js
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

//minify css
var cssnano = require('gulp-cssnano');

// making gulp watching for changes/saves---defining browserSync for sass and watch functions
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ''
        }
    });
});

//defining sass for watch function
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('useref', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        //minifies JS files only
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));//NOTHING SENT TO DIST
});

//I am The Watcher
gulp.task('watch', ['browserSync'], function () {
    //reloads css when scss is saved
    gulp.watch('scss/**/*.scss', ['sass']);
    //reloads browser when html or js changes
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('*.php', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
