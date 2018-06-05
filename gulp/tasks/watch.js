'use strict';
var gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();




//======================================================================================
// Watch files for changes & reload
// =====================================================================================
gulp.task('watch', function() {

    // Initialize Browser sync
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });


    watch('./app/**/*.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.scss', function() {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function() {
        gulp.start('scriptsRefresh');
    });

    watch(['app/assets/fonts/**/*'], function() {
        gulp.start('copyFontsTemp');
    });

    watch(['app/assets/images/**/*'], function() {
        gulp.start('copyImagesTemp');
    });

});






// ======================================================================================
// Copy fonts for prdocuction
// ======================================================================================
gulp.task('copyFontsTemp', function() {
    return gulp.src('./app/assets/fonts/**')
        .pipe(gulp.dest('./app/temp/fonts/'));
});



// ======================================================================================
// Copy images for prdocuction
// ======================================================================================
gulp.task('copyImagesTemp', function() {
    return gulp.src('./app/assets/images/**')
        .pipe(gulp.dest('./app/temp/images/'));
});



// ======================================================================================
// Run sass compiler & stream css 
// ======================================================================================
gulp.task('cssInject', ['sass'], function() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});




// ======================================================================================
// Run webpack and reload browser
// ======================================================================================
gulp.task("scriptsRefresh", ["scripts"], function() {
    browserSync.reload();
});

// =======================================================================================
// Delete temp folder
// =======================================================================================
gulp.task('deleteTempFolder', function() {
    return del('./app/temp');
});


// ======================================================================================
// Build production files, the default task
// ======================================================================================
gulp.task('default', function(callback) {
    runSequence('deleteTempFolder', ['sass', 'scripts', 'copyFontsTemp', 'copyImagesTemp'], 'watch', callback);
});