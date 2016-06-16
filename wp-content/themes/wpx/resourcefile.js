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

// making gulp watching for changes/saves
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ''
        }
    });
});

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
        .pipe(gulp.dest('dist'));
});

gulp.task('useref', function () {
    return gulp.src('*.html')
            .pipe(useref())
            .pipe(gulpIf('js/**/*.js', uglify()))
            //minifies only if css file
            .pipe(gulpIf('css/**/*.css', cssnano()))
            .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    //reloads css when scss is saved
    gulp.watch('scss/**/*.scss', ['sass']);
    //reloads browser when html or js changes
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});