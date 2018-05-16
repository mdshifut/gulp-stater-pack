var gulp = require("gulp"),
    webpack = require("webpack");


// =========================================================================
// Transpiles ES2015 code to ES5 Concatenate and minify JavaScript. 
// =========================================================================
gulp.task('scripts', function(callback) {
    webpack(require("../../webpack.config.js"), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});