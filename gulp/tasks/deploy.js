// deploy to gh-pages
var gulp    = require('gulp'),
    ghPages = require ('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*').pipe(ghPages({
    branch: "gh-pages"
  }));
});
