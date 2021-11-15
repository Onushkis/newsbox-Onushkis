const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const gulp = require("gulp");
const babel = require("gulp-babel");

//Function for Babel
function buildJavaScript() {
  return src("js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest("./dist/js"));
}

function buildStyles() {
  return (
    src("Sass/**/*.scss")
      .pipe(sass({ outputStyle: "expanded" }))
      // .pipe(purgecss({ content: ["*.html"] }))
      .pipe(dest("./dist/css"))
  );
}

//WatchTask
function watchTask() {
  watch(
    ["Sass/**/*.scss", "js/**/*.js", "*.html"],
    series(buildStyles, buildJavaScript)
  );
}

exports.default = series(buildStyles, buildJavaScript, watchTask);
