var gulp = require('gulp');

// ==================================================================
// Copy  Node_models css for prdocuction
// ==================================================================
gulp.task('copyNodeCss', function() {
    var pathsToCopy = [
        './node_modules/animate.css/animate.css'
    ]
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./app/temp/styles"));
});