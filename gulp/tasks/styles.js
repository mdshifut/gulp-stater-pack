var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    sourcemaps = require('gulp-sourcemaps');


// ======================================================================================
// Compile and automatically prefix stylesheets and rename main.css to style.css
// ======================================================================================
gulp.task('sass', ['copyNodeCss'], function() {
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
    var sassStream,
        cssStream;

    //compile sass
    sassStream = gulp.src('./app/assets/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/temp/styles/'));

    //select additional css files
    cssStream = gulp.src(['./app/temp/styles/*.css', '!./app/temp/styles/main.css']);


    //merge the two streams and concatenate their contents into a single file
    return merge(sassStream, cssStream)
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/temp/styles/'));

});