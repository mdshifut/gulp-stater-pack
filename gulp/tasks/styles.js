var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    del = require('del'),
    merge = require('merge-stream'),
    sourcemaps = require('gulp-sourcemaps');


// ======================================================================================
// Compile and automatically prefix stylesheets and rename main.css to style.css
// ======================================================================================
gulp.task('sass', function() {


    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];



    return gulp.src('./app/assets/styles/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/temp/styles/'));



});