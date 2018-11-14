var gulp = require('gulp');
var minify = require('gulp-minify')
var concat = require('gulp-concat')

var sass = require('gulp-sass')
var bootstrap = require('bootstrap')
var jQuery = requre('jquery')
gulp.task('compress-js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
});

gulp.task('compress-css', function() {
    return gulp.src('./src/scss/*.css')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.css', ['compress-css'])
    gulp.watch('./src/js/*.js', ['compress-js'])
})
