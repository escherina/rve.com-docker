var gulp = require('gulp');
var config = require('../../config');

gulp.task('scripts_noconcat', function() {
  return gulp.src(config.scripts_noconcat.src)
    .pipe(gulp.dest(config.scripts_noconcat.dest));
});
