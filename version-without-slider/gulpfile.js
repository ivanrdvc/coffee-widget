var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');


// Browser Sync for auto reload
gulp.task('browser-sync', ['sass'], function () {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

// Minify JavaScript files
gulp.task('minifyjs', function () {
    return gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('js/'));
});

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({stream: true}));
});

// Autoprefix CSS
gulp.task('prefix', function () {
    return gulp.src('assets/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('assets/css/'));
});

// Minify CSS files
gulp.task('minifycss', ['prefix'], function () {
    return gulp.src('assets/css/main.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('assets/css/'));
});

// Copy all files at the root level
gulp.task('build', ['minifyjs', 'sass', 'minifycss'], function () {
    return gulp.src('./**', {base: './'})
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('assets/img/**/*.{png,jpg,gif,svg}', browserSync.reload);
});