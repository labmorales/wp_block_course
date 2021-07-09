const gulp = require("gulp");
const gulpZip = require("gulp-zip");

function bundle() {
    return gulp
        .src([
            "**/*",
            "!node_modules/**",
            "!src/**",
            "!*.js",
            "!src/**",
            "!package*",
            "!bundled/**",
            "!webpack.config.js/**",
            "!.gitignore",
            "!postcss.config.js",
        ])
        .pipe(gulpZip("custom-blocks.zip"))
        .pipe(gulp.dest("bundled"));
}

exports.bundle = bundle;
